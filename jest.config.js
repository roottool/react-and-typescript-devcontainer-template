/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/tests/'],
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
}

module.exports = config
