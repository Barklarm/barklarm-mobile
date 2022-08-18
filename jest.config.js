/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/renderer/themes/**",
    "!src/types/**",
    "!src/**/*.d.ts"
  ]
};