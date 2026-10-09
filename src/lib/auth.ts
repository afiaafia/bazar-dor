import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const authSecret = process.env.BETTER_AUTH_SECRET;
const baseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  "http://localhost:3000";

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

if (!authSecret || authSecret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET is missing or too short in .env.local");
}

const mongoClient = new MongoClient(mongoUri);
const database = mongoClient.db();

const socialProviders = {
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {}),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {}),
};

export const auth = betterAuth({
  database: mongodbAdapter(database, {
    client: mongoClient,
  }),

  secret: authSecret,
  baseURL,

  trustedOrigins: [
    ...new Set(
      [
        baseURL,
        process.env.BETTER_AUTH_URL,
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
      ].filter((value): value is string => Boolean(value)),
    ),
  ],

  logger: {
    level: "debug",
  },

  onAPIError: {
    onError: (error) => {
      console.error("[Better Auth API Error]", error);
    },
  },

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  ...(Object.keys(socialProviders).length > 0
    ? { socialProviders }
    : {}),
});
