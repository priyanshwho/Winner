import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not defined");

  const pool = new pg.Pool({
    connectionString: url,
    keepAlive: true,
    idleTimeoutMillis: 3 * 60 * 1000,
    connectionTimeoutMillis: 10_000,
    max: 5,
  });

  pool.on("error", (err: Error) => {
    console.error("Database pg pool error:", err);
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
