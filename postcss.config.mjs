const config = {
  plugins: ['@tailwindcss/postcss'],
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'theme', 'utility'],
      },
    ],
  },
};

export default config;
