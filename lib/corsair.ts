import { createCorsair } from "corsair";
import { gmail } from "@corsair-dev/gmail";
import { googlecalendar } from "@corsair-dev/googlecalendar";
import { pool } from "./db";

// Force IPv4 DNS resolution - IPv6 is broken on some local mac configurations
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

if (!process.env.CORSAIR_KEK) {
  throw new Error("CORSAIR_KEK environment variable is not defined");
}

export const corsair = createCorsair({
  plugins: [gmail(), googlecalendar()],
  database: pool,
  kek: process.env.CORSAIR_KEK,
  multiTenancy: true,
});
