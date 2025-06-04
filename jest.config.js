export default async () => ({
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: "node"
});
