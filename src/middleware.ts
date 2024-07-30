// middleware.ts
export {default} from "next-auth/middleware";

export const config = {
  matcher: ["/CreateUser"] // Apply middleware only to /dashboard and its sub-paths
};
