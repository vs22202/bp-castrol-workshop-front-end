export default {
    preset: 'ts-jest',
    roots:['<rootDir>/src'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
        '^.+\\.(svg)$': "identity-obj-proxy"
    },
}