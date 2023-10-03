import NextAuth, { Profile, Awaitable } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToBD } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [GoogleProvider({ clientId: "", clientSecret: "" })],
  callbacks: {
    session: async ({ session }: any) => {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    signIn: ({
      profile,
    }: {
      profile?: Profile | undefined;
    }): Awaitable<string | boolean> => {
      const connect = async () => {
        try {
          await connectToBD();
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
