import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "726678658112-o9pa2299vsi75vnpa2ga0dejgjj7govg.apps.googleusercontent.com",
      clientSecret: "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"
    }) 
  ],
});

export { handler as GET, handler as POST};