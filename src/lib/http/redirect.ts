import { serialize } from "cookie-es";

export function redirect(location: string, clearCookie = false) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      ...(clearCookie && {
        "Set-Cookie": serialize("admin_session", "", {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          secure: import.meta.env.PROD,
          maxAge: 0,
        }),
      }),
    },
  });
}
