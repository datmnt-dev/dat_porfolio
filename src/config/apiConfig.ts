const DEFAULT_API_BASE_URL = import.meta.env.PROD
  ? "https://portfolio-mail-api-ajbi.onrender.com"
  : "http://localhost:5000";

export const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, "");
