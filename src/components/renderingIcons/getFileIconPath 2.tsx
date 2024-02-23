const getFileIconPath = (fileName: string) => {
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
