export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", 
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    '^.+\\.ts$': 'ts-jest',
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
