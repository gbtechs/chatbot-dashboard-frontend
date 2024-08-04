import axios from "axios";
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

        try {
          const res = await axios.post(
            `${process.env.API_URL || "http://157.230.96.120:8000/api"}/login`,
            { email: username, password },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const user = await res.data;

          return user;
        } catch (error: any) {
          console.error(error.response.data.detail);
          throw error;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 4 hours
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
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
