import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>src/**/*.spec.ts'],
  resolver: '<rootDir>/src/bin/jest-mjs-resolver.js',
  testEnvironment: 'node',
  collectCoverage: true,
  extensionsToTreatAsEsm: ['.mts'],
  transform: {
    '^.+\\.mts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;