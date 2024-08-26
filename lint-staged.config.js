module.exports = {
  '*.{ts,tsx}': [() => 'npm run format:fix', () => 'npm run test', 'git add .'],
};
