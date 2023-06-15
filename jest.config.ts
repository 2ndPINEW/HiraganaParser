import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testMatch: ["<rootDir>src/**/*.spec.ts"],
  resolver: "<rootDir>/tools/jest-mjs-resolver.cjs",
  testEnvironment: "node",
  collectCoverage: true,
  extensionsToTreatAsEsm: [".mts"],
  transform: {
    "^.+\\.mts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default config;
