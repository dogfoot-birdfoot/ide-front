module.exports = {
  // ESLint-config-prettier 활성화(충돌하는 ESLint 규칙 무시)
  extends: [
    "prettier",
    "plugin:react/recommended", // 이 줄을 extends 배열로 이동
    "plugin:@typescript-eslint/recommended"
  ],
  // ESLint-plugin-prettier
  plugins: [
    "prettier",
    "react", // 'plugin:' 접두사 제거 및 여기로 이동
    "@typescript-eslint" // '@typescript-eslint' 플러그인 명시
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

