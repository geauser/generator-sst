import { Database, sql } from "./index";
import { Config } from "sst/node/config";

export const isUsingPlanetScale = !Config.STAGE.startsWith('local');

export const getLastInsertedId = async (db: Database) => {
  const raw = await db.execute(sql`SELECT LAST_INSERT_ID() AS lastId`);
  // @ts-ignore
  const [{ lastId }] = isUsingPlanetScale ? raw.rows! : raw[0];
  return lastId as number;
};
