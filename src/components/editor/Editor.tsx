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

export const Editor: React.FC<EditorProps> = ({ fileTabs, activeTabIndex }) => {
  // 현재 활성화된 탭 객체를 가져옵니다.
  const activeTab = fileTabs[activeTabIndex]
  // 현재 활성화된 탭의 파일 이름을 가져옵니다.
  const activeFileName = activeTab?.activeFile
  // 현재 활성화된 탭의 파일 내용을 가져옵니다. 파일 이름이 없거나, 해당 파일 이름에 대한 내용이 없다면 기본값을 사용합니다.
  const activeFileContent = activeFileName ? activeTab.fileContents[activeFileName] : "// Select a file from the tree"

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
