module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "<rootDir>/__tests__/e2e/**/*.(ts|js)",
        // "!<rootDir>/tmp/**/*",
    ],
    testEnvironment: "node",
    testPathIgnorePatterns: [
        "<rootDir>/tmp",
        "<rootDir>/otherRequiredFiles",
        // "<rootDir>/tmp/**/*",
        // "!**/tmp/**/*.*",
        // "**/__tests__/tmp/**/*.(ts|js)",
    ],
    modulePathIgnorePatterns: [
        "<rootDir>/tmp",
        "<rootDir>/otherRequiredFiles",
        // "!**/tmp/**/*.*",
        // "**/__tests__/tmp/**/*.(ts|js)",
    ]
};
