import NextAuth, {
  Profile,
  Awaitable,
  DefaultSession,
  Session,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

declare module "next-auth" {
  interface User {
    id?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
const handler = NextAuth({
  providers: [GoogleProvider({ clientId: "", clientSecret: "" })],
  callbacks: {
    session: async ({ session }: { session: Session }) => {
      const user = session.user;
      if (user) {
        const sessionUser = await User.findOne({ email: user.email });
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
          const userExists = await User.findOne({ email: profile?.email });
          if (!userExists) {
            await User.create({
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
