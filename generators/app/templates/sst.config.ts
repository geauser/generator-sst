import { SSTConfig } from "sst";
import { ConfigStack } from "./stacks/Config";


export default {
  config(_input) {
    return {
      name: "<%= projectName %>",
      region: "us-east-1",
    };
  },
  stacks(app) {

    app.stack(ConfigStack);

  }
} satisfies SSTConfig;
