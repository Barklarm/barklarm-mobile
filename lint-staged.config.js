module.exports = {
    '*.{ts,tsx}': [() => 'yarn format:fix', 'yarn test', 'git add .'],
  };