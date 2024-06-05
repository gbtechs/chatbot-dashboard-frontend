export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/conversation-history",
    "/leads",
    "/feedbacks",
    "/sources",
    "/sources/:path*",
    "/settings",
    "/support",
  ],
};
