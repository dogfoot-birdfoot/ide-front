import React from "react"
import CodeMirror from "@uiw/react-codemirror"
import createTheme from "@uiw/codemirror-themes"
import { tags as t } from "@lezer/highlight"
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { javascript } from "@codemirror/lang-javascript"

function Editor() {
  const theme = createTheme({
    theme: "light",
    settings: {
      background: "#fffff",
      backgroundImage: "",
      foreground: "#75baff",
      caret: "#5d00ff",
      selection: "#036dd626",
      selectionMatch: "#036dd626",
      lineHighlight: "#8a91991a",
      gutterBorder: "1px solid #ffffff10",
      gutterBackground: "#fff",
      gutterForeground: "#8a919966"
    },
    styles: [
      { tag: t.comment, color: "#d97706" },
      { tag: t.variableName, color: "#e11d48" },
      { tag: [t.string, t.special(t.brace)], color: "#ea580c" },
      { tag: t.number, color: "#1d4ed8" },
      { tag: t.bool, color: "#701a75" },
      { tag: t.null, color: "#4f46e5" },
      { tag: t.keyword, color: "#1d4ed8" },
      { tag: t.operator, color: "#5c6166" },
      { tag: t.className, color: "#65a30d" },
      { tag: t.definition(t.typeName), color: "#ea580c" },
      { tag: t.typeName, color: "#ea580c" },
      { tag: t.angleBracket, color: "#be185d" },
      { tag: t.tagName, color: "#5d00ff" },
      { tag: t.attributeName, color: "#1d4ed8" }
    ]
  })

  return (
    <CodeMirror
      theme={theme}
      value="console.log('hello world!');"
      height="h-screen"
      basicSetup={{
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
        lineNumbers: true,
        tabSize: 4
      }}
      extensions={[theme, javascript({ jsx: true })]} // 확장을 추가합니다.
    />
  )
}
export default Editor
