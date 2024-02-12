import React, { useState } from "react"
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
import { useActiveFile } from "../../context/ActiveFileContext"

const Editor: React.FC = () => {
  const { activeFile, activeFileContent } = useActiveFile()

  return (
    <CodeMirror
      theme={material}
      value={activeFileContent || activeFile}
      height="100%"
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
