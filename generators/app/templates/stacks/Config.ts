import { Config, StackContext } from "sst/constructs";
import { transformParamsIntoMapAndList } from "./utils/params";


export function ConfigStack({ stack }: StackContext) {

  const entries = [
    "DATABASE_HOST",
    "DATABASE_PORT",
    "DATABASE_NAME",
    "DATABASE_USER",
    "DATABASE_PASSWORD",
    "AXIOM_TOKEN",
  ] as const;

  const secretsAsList = entries.map((key) => new Config.Secret(stack, key));
  const secretsAsMap  = Object.fromEntries(
    entries.map((key, i) => [key, secretsAsList[i]])
  ) as { [K in (typeof entries)[number]]: Config.Secret };

  const paramsValues = {
    REGION: stack.region,
    AWS_ACCOUNT_ID: stack.account,
  } as const;

  return {
    /**
     * The reason we are returning the secrets and params
     * as a list and as a map is because we want to be able
     * to blanket bind them as well as individually bind them.
     */
    secrets: { asList: secretsAsList, asMap: secretsAsMap },
    params: transformParamsIntoMapAndList(stack, paramsValues),
  };
}
