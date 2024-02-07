import React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { materialDark as material, materialDarkInit as materialInit } from "@uiw/codemirror-theme-material"

function Editor() {
  return (
    <CodeMirror
      // material 테마를 사용합니다.
      theme={material}
      value="console.log('hello world!');"
      height="h-screen"
      basicSetup={{
        foldGutter: true,
        dropCursor: true,
        allowMultipleSelections: false,
        indentOnInput: false,
        lineNumbers: true,
        tabSize: 4
      }}
      extensions={[material, javascript({ jsx: true })]} // 확장을 material 테마로 변경합니다.
    />
  )
}

export default Editor
