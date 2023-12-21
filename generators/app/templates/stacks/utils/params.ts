import { Config, Stack } from "sst/constructs";

export function transformParamsIntoMapAndList<T extends Record<string, string>>(stack: Stack, params: T) {

  const asList = Object.entries(params).map(([key, value]) => {
    return new Config.Parameter(stack, key, { value });
  });

  const asMap = Object.fromEntries(
    asList.map((param) => [param.node.id, param])
  ) as { [K in keyof typeof params]: Config.Parameter };

  return { asList, asMap };
}
