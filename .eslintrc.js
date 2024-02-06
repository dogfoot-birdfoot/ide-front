module.exports = {
  // ESlint-config-prettier 활성화(충돌하는 ESLint 규칙 무시)
  extends: ["prettier"],
  // ESlint-plugin-prettier
  plugins: [
    "prettier",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // ESLint 내부에서 Prettier 실행
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    // 충돌이 일어나는 부분 비활성화
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
};
