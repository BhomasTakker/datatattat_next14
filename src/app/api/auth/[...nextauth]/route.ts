// https://www.youtube.com/watch?v=MNm1XhDjX1s

import NextAuth from "next-auth";
import { options } from "./options";

const handler = NextAuth(options);
export { handler as GET, handler as POST };
