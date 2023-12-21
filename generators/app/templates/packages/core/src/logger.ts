import { transports, createLogger, format } from "winston";
import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';
import { Config } from "sst/node/config";
import chalk from "chalk";
import _ from "lodash";



const isProd = Config.STAGE === "prod";


const axiomTransport = new AxiomTransport({
  dataset: `${Config.STAGE}-logs`,
  token: Config.AXIOM_TOKEN,
});

export const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.errors({ stack: true }),
    format.json(),
  ),
  exitOnError: false,
});


if (isProd) {
  logger.add(axiomTransport);
  logger.exceptions.handle(axiomTransport);
  logger.rejections.handle(axiomTransport);
}
else {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf(({ level, message, ...metadata }) => {
        return `[${level}] ${chalk.gray(message)} ${!_.isEmpty(metadata) ? '→ ' + JSON.stringify(metadata, null, 2) : ''}`;
      }),
    )
  }));
}


