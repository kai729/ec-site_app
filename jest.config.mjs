// jest.config.mjs
export default {
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["babel-jest", { presets: ["@babel/preset-react"] }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
