import NextAuth, {
  Profile,
  Awaitable,
  DefaultSession,
  Session,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import Users from "@models/user";

declare module "next-auth" {
  interface User {
    id?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

const { GOOGLE_ID, GOOGLE_CLIENT_SECRET } = process.env;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({ session }: { session: Session }) => {
      const user = session.user;
      if (user) {
        const sessionUser = await Users.findOne({ email: user.email });
        user.id = sessionUser._id.toString();
      }
      return session;
    },
    signIn: ({
      profile,
    }: {
      profile?: Profile | undefined;
    }): Awaitable<string | boolean> => {
      const connect = async () => {
        try {
          await connectToDB();
          const userExists = await Users.findOne({ email: profile?.email });
          if (!userExists) {
            await Users.create({
              email: profile?.email,
              username: profile?.name?.replace(" ", "").toLowerCase(),
              image: profile?.image,
            });
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      };
      return connect();
    },
  },
});

export { handler as GET, handler as POST };
