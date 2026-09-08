import { defineConfig, type Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function readJsonBody(req: import("http").IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? (JSON.parse(raw) as Record<string, unknown>) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function spotifyDevApi(): Plugin {
  return {
    name: "spotify-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/now-playing")) return next();

        try {
          const env = loadEnv(server.config.mode, process.cwd(), "");
          process.env.SPOTIFY_CLIENT_ID ||= env.SPOTIFY_CLIENT_ID;
          process.env.SPOTIFY_CLIENT_SECRET ||= env.SPOTIFY_CLIENT_SECRET;
          process.env.SPOTIFY_REFRESH_TOKEN ||= env.SPOTIFY_REFRESH_TOKEN;

          const { getNowPlaying } = await import("./api/_lib/spotify.js");
          const payload = await getNowPlaying();
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store");
          res.end(JSON.stringify(payload));
        } catch (err) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              isPlaying: false,
              empty: true,
              configured: false,
              error: err instanceof Error ? err.message : "error",
            })
          );
        }
      });
    },
  };
}

/** Local `/api/resume-lead` so resume form works under `vite` (not only Vercel). */
function resumeLeadDevApi(): Plugin {
  return {
    name: "resume-lead-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url !== "/api/resume-lead") return next();

        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ ok: false, error: "POST only" }));
          return;
        }

        try {
          const fileEnv = loadEnv(server.config.mode, process.cwd(), "");
          const env = { ...process.env, ...fileEnv } as NodeJS.ProcessEnv;
          const body = await readJsonBody(req);
          const { processResumeLead } = await import("./api/lib/resumeLeadCore.mjs");
          const result = await processResumeLead(body, env);
          res.statusCode = result.ok ? 200 : result.status || 500;
          res.end(JSON.stringify(result.ok ? { ok: true } : { ok: false, error: result.error }));
        } catch (err) {
          res.statusCode = 502;
          res.end(
            JSON.stringify({
              ok: false,
              error: err instanceof Error ? err.message : "Upstream error",
            })
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Allow Cloudflare / localtunnel / localhost.run preview hosts
    allowedHosts: true,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && spotifyDevApi(),
    mode === "development" && resumeLeadDevApi(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
