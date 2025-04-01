

export default function wallaby() {
  return {
    files: [
      "src/**/*.ts",
      "src/**/*.tsx",
      "!src/__tests__/**/*.test.ts",
      "!src/__tests__/**/*.test.tsx",
      "jest.setup.ts", 
    ],

    tests: ["src/__tests__/**/*.test.ts", "src/__tests__/**/*.test.tsx"],

    env: {
      type: "node",
      runner: "node",
    },

    testFramework: "jest",

    setup: (w) => {
      const jestConfig = require("./jest.config.ts"); 
      w.testFramework.configure(jestConfig);
    },
  };
}
