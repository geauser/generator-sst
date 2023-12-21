import { migrate as migrateMysql } from "drizzle-orm/mysql2/migrator";
import { migrate as migratePlanetscale } from "drizzle-orm/planetscale-serverless/migrator";
import { Config } from "sst/node/config";
import chalk from "chalk";
import { db } from "./index";
import { isUsingPlanetScale } from "./utils";


const options = { migrationsFolder: "./migrations" };


console.log(
  chalk.gray('Connecting to'),
  `${chalk.white('mysql://')}${chalk.white(Config.DATABASE_HOST)}:${chalk.white(Config.DATABASE_PORT)}/${chalk.bold.yellow(Config.DATABASE_NAME)}`,
  chalk.gray('...'),
);
console.log(chalk.gray('Migrating on stage'), chalk.bold.yellow(Config.STAGE), chalk.gray('...'));

try {

  // @ts-expect-error
  if (isUsingPlanetScale) await migratePlanetscale(db, options);
  else await migrateMysql(db, options);


  console.log(chalk.green('Migration complete!'), '\n');
  process.exit(0);

} catch (err) { console.error(`Error: ${err}`); }

