import { defineConfig, type Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && spotifyDevApi(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
