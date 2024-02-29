export default {
    preset: 'ts-jest',
    roots:['<rootDir>/src'],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
        '^.+\\.(css|less|svg)$': "identity-obj-proxy"
    },
}