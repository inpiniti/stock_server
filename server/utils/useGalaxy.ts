import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const ip = "116.121.7.117";
const port = "5432";
const user = "inpiniti";
const password = "wjd53850";
const database = "inpiniti";
const url = `postgres://${user}:${password}@${ip}:${port}/${database}`;

let db: any;

export const useGalaxy = () => {
  if (!db) {
    const queryClient = postgres(url);
    db = drizzle(queryClient);
  }

  return db;
};
