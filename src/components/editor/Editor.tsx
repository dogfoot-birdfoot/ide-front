import React from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { cpp } from "@codemirror/lang-cpp"
import { java } from "@codemirror/lang-java"
import { materialDark as material } from "@uiw/codemirror-theme-material"
import { autocompletion } from "@codemirror/autocomplete"
import { keymap } from "@codemirror/view"
import { completionKeymap } from "@codemirror/autocomplete"
import { cppCompletions, javaCompletions, pythonCompletions } from "./autocomplete"
import { EditorProps } from "type"

// Editor 컴포넌트
export const Editor: React.FC<EditorProps> = ({ fileTabs, activeTabIndex }) => {
  // 에디터에서 표시할 파일 내용을 결정하는 로직이 필요합니다.
  const content = fileTabs[activeTabIndex]?.fileContents || {}

  // 선택된 파일 내용을 가져옵니다.
  const activeFileContent = content[fileTabs[activeTabIndex]?.activeFile] || "// Select a file from the tree"

  return (
    <CodeMirror
      theme={material}
      value={activeFileContent}
      height="h-screen"
      basicSetup={{
        foldGutter: true,
        dropCursor: true,
        allowMultipleSelections: false,
        indentOnInput: false,
        lineNumbers: true,
        tabSize: 4
      }}
      extensions={[
        material,
        javascript({ jsx: true }),
        python(),
        cpp(),
        java(),
        autocompletion({ override: [pythonCompletions, javaCompletions, cppCompletions] }),
        keymap.of(completionKeymap)
      ]}
    />
  )
}

export default Editor
