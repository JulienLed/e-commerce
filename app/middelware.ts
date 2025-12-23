// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Vérifier si le guestId existe déjà
  const existingGuestId = request.cookies.get("guestId");

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
