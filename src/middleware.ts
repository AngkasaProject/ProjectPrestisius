import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
  const pathname = url.pathname;

  const cookieHeader = request.headers.get("cookie") ?? "";

  const isLoggedIn = cookieHeader.split(";").some((cookie) => {
    const name = cookie.trim().split("=")[0];

    return name.startsWith("sb-") && name.endsWith("-auth-token");
  });

  if (!isLoggedIn && pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", url), 302);
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    return Response.redirect(new URL("/admin", url), 302);
  }

  return next();
});
