import { JWT } from "next-auth/jwt";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server"

function traverseObject<T extends Record<string, any>>(token: T){
  for (let key in token) { 
    if ( key === "user" ) return token["user"];
    if (typeof token[key] === "object") {
      return traverseObject(token[key] as JWT);
    }
  }
}

type AnyObject = { [key: string]: any };

function findUserAttribute(obj: AnyObject | null): any | undefined {
    for (const key in obj) {
        if (key === "user") {
            return obj[key];
        }

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const result = findUserAttribute(obj[key]);
            if (result !== undefined) {
                return result;
            }
        }
    }

    return undefined;
}

// middleware.ts
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token: JWT | null = req.nextauth.token;
    if (!token || !req.nextauth.token) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
    const user = findUserAttribute(token);
    if (!user) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
    if (user.role === "admin") {
      return NextResponse.next();
    };
    return NextResponse.rewrite(new URL("/Denied", req.url));
  },
  {
    callbacks: {
      authorized: ({token}) => !!token,
    }
  }
)

export const config = {
  matcher: ["/CreateUser"] // Apply middleware only to /dashboard and its sub-paths
};
