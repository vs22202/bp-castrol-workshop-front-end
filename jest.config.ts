const tsPreset = require('ts-jest/jest-preset');
const puppeteerPreset = require('jest-puppeteer/jest-preset');

export default {
    /* preset: 'ts-jest', */
    roots:['<rootDir>/src'],
    /* testEnvironment: 'jest-environment-jsdom', */
    /* transform: {
        "^.+\\.tsx?$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
        '^.+\\.(svg)$': "identity-obj-proxy"
    }, */
    projects: [
        {
          displayName: 'unit-tests',
          testMatch: ['<rootDir>/src/components/**/*.test.tsx', '<rootDir>/src/views/**/*.test.tsx'],
          ...tsPreset,
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
        },
        {
          displayName: 'e2e-tests',
          testMatch: ['<rootDir>/e2e/*.test.tsx'],
          ...puppeteerPreset,
          testEnvironment: 'jest-environment-puppeteer',
          transform: {
            "^.+\\.tsx?$": "ts-jest",
            ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
        // process `*.tsx` files with `ts-jest`
        },
        moduleNameMapper: {
            '\\.(gif|ttf|eot|png)$': '<rootDir>/src/test/__ mocks __/fileMock.js',
            '^.+\\.(svg)$': "identity-obj-proxy"
        },
        },
    ],
}