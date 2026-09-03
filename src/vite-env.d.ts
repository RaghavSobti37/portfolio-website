/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_API_URL?: string;
  /** Microsoft Clarity project ID (Settings → Overview) */
  readonly VITE_CLARITY_PROJECT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
