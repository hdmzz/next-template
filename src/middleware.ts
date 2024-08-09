import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function flattenObject(obj: any, parentKey: string = '', result: any = {}): any {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

// middleware.ts
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log(req.nextauth.token)

    return NextResponse.rewrite(new URL("/Denied", req.url));
  },
  {
    callbacks: {
      authorized: ({token}) => !!token,//!! pour inverser deux fois la valeur ce qui renvoi un booleeen
    }
  }
)

export const config = {
  matcher: ["/CreateUser"] // Apply middleware only to /dashboard and its sub-paths
};
