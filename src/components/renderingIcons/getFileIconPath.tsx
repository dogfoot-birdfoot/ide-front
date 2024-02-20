export const getFileIconPath = (fileName: string) => {
  if (fileName.endsWith(".jsx")) return "/react.png"
  if (fileName.endsWith(".css")) return "/css.png"
  if (fileName.endsWith(".ts")) return "/typescript.png"
  if (fileName.endsWith(".html")) return "/html.png"
  if (fileName.endsWith(".cpp")) return "/cplus.png"
  if (fileName.endsWith(".py")) return "/python.png"
  if (fileName.endsWith(".java")) return "/java.png"
  if (fileName.endsWith(".js")) return "/js.png"
  return "/file.png" // 기본 파일 아이콘
}

export const languageToFileExtension = (language: string) => {
  switch (language) {
    case "JavaScript":
      return ".js"
    case "Python":
      return ".py"
    case "Java":
      return ".java"
    case "C++":
      return ".cpp"
    case "TypeScript":
      return ".ts"
    case "CSS":
      return ".css"
    case "HTML":
      return ".html"
    case "React": // React는 일반적으로 JS 또는 JSX 파일을 사용합니다.
      return ".jsx"
    // 다른 언어와 확장자 매핑 추가 가능
    default:
      return "" // 알 수 없는 언어의 경우 기본 값
  }
}
