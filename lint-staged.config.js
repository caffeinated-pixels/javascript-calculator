module.exports = {
  // run ESLint
  '**/*.{js,jsx,ts,tsx}': 'eslint --max-warnings=0',
  // then run type-check
  '**/*.{ts,tsx}': () => 'tsc -p tsconfig.json --noEmit',
}
