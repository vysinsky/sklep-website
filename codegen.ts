import "dotenv/config";

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://graphql.datocms.com": {
      headers: {
        Authorization: process.env.DATOCMS_TOKEN as string,
      },
    },
  },
  documents: ["app/**/*.tsx", "components/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "generated/graphql/": {
      preset: "client",
      config: {
        namingConvention: "keep",
        transformUnderscore: true,
      },
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
};

export default config;
