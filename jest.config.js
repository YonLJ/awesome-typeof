/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{tsconfig: "tsconfig.test.json"}],
  },
  testPathIgnorePatterns: ["node_modules", "dist"]
};
