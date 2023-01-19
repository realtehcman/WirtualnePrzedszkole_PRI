module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.scss$': 'jest-css-modules-transform',
        '^.+\\.css$': 'jest-css-modules-transform',
    }
};
