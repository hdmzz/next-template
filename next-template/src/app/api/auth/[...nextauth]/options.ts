import { randomUUID } from "crypto";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";  

export const options = {
        providers: [
            GitHubProvider({
                profile: (profile) => {
                    
                    let userRole = "Github user";
                    if (profile.email === "hdamitzian@gmail.com") {
                        userRole = "admin";
                    }
                        
                        return {
                            id: profile.id.toString(),
                            name: profile.name || profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                            role: userRole,
                        };
                    },
                    clientId: process.env.GITHUB_ID as string,
                    clientSecret: process.env.GITHUB_SECRET as string,
            }),
            GoogleProvider({
                profile: (profile) => {
                    
                    let userRole = "Google user";
                    if (profile.email === "hdamitzian@gmail.com")
                        userRole = "admin";
                    return {
                        id: profile.id?.toString() ?? randomUUID(),
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        role: userRole,
                    };
                },
                clientId: process.env.GOOGLE_ID as string,
                clientSecret: process.env.GOOGLE_SECRET as string,
            }),
        ],
        callbacks: {
            async session(session: any) {
                return session;
            },
            async jwt(token: any, user: any) {

                if (user) {
                    token.role = user.role;
                }
                return token;   
            }
        },
  };
