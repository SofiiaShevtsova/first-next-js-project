import NextAuth, {Profile} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToBD } from "@utils/database";

const handler = NextAuth({
    providers: [GoogleProvider({ clientId: "", clientSecret: "" })],
    callbacks: {
  session: async ({ session }: any) => session,
        signIn: async ({ profile }: { profile?: Profile | undefined }) => {
      try {
        await connectToBD()
      } catch (error) {
        
      }
  },
  },
});

export { handler as GET, handler as POST }