module.exports = {
    setupFilesAfterEnv: ['./src/test-setup.ts'],
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'jest-transform-css',
    },
    transform: {
        '\\.(ts|tsx)?$': 'babel-jest',
    },
};
