// Site ka asli address. Deploy ke baad .env mein apna domain likhein.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");