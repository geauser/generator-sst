import {
  boolean,
  index,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core";


const len = (length: number) => ({ length });
