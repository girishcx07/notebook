import { account, db, session, user, verification } from "@notebook/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    // cookieCache: {
    //   maxAge: 60 * 60 * 24 * 7, // 1 week,
    //   refreshCache: {
    //     updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    //   },
    //   strategy: "compact",
    //   version: "1.0.1",
    // },
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
