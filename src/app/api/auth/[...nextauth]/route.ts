import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;

        const res = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          body: JSON.stringify({ email: username, password }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },

  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
