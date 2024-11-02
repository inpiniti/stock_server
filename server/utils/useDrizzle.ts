import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and } from "drizzle-orm";

// u0_a116

//const ip = "116.121.7.117";
//const port = "5432";
//const user = "inpiniti";
//const password = "wjd53850";
//const database = "inpiniti";

const ip = "192.168.0.32";
const port = "5432";
const user = "postgres";
const password = "!Wjd53850";
const database = "postgres";
const url = `postgres://${user}:${password}@${ip}:${port}/${database}`; //?sslmode=require`;

let db: any;

export const useDrizzle = () => {
  if (!db) {
    const queryClient = postgres(url);
    db = drizzle(queryClient);

    // upsert 메서드 추가
    db.upsert = function (tableName: any) {
      return {
        async values(data: any, options: { onConflict: string[] }) {
          // 입력 데이터를 배열로 변환
          const dataArray = Array.isArray(data) ? data : [data];
          if (dataArray.length == 0) return false;
          try {
            for (const row of dataArray) {
              const conflictConditions = options.onConflict.map((col) =>
                eq(tableName[col], row[col])
              );
              const combinedCondition = and(...conflictConditions);
              const existingRow = await db
                .select()
                .from(tableName)
                .where(combinedCondition);

              console.log("existingRow", existingRow);
              console.log("row", row);
              console.log("conflictCondition", combinedCondition);

              if (existingRow.length > 0) {
                console.log("update");
                await db.update(tableName).set(row).where(combinedCondition);
              } else {
                console.log("insert");
                await db.insert(tableName).values(row);
              }
            }

            return true;
          } catch (error) {
            console.error("error002", error);
            throw error;
          }
        },
      };
    };
  }

  return db;
};
