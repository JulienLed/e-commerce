// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = req.nextUrl;

  //Vérifier Role
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.redirect(new URL("/signIn", req.url));
    if (token.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", req.url));
  }

  // Vérifier si le guestId existe déjà
  const existingGuestId = req.cookies.get("guestId");

  if (!existingGuestId) {
    // Créer un nouveau guestId
    const guestId = crypto.randomUUID();

    response.cookies.set("guestId", guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 jours
    });
  }

  return response;
}

// Configuration : sur quelles routes le middleware s'applique
export const config = {
  // Exclut les fichiers statiques, API routes, etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)"],
};
