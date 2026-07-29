import { defineConfig } from "astro/config";

const DEFAULT_LOCAL_SITE = "http://localhost:4321";

function normalizeSite(value) {
  const site = new URL(value || DEFAULT_LOCAL_SITE);

  // PUBLIC_BASE_PATH is the single source of truth for subdirectory hosting.
  site.pathname = "/";
  site.search = "";
  site.hash = "";

  return site.toString();
}

function normalizeBasePath(value) {
  const segments = (value || "/")
    .trim()
    .split("/")
    .filter(Boolean);

  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

export default defineConfig({
  output: "static",
  site: normalizeSite(process.env.PUBLIC_SITE_URL),
  base: normalizeBasePath(process.env.PUBLIC_BASE_PATH),
  trailingSlash: "always",
  build: {
    format: "directory"
  }
});
