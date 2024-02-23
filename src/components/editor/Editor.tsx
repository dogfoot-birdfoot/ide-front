import React, { useEffect } from "react"
import axios from "axios"

import { EditorProps } from "type"
import {
  cppCompletions,
  javaCompletions,
  javascriptCompletions,
  pythonCompletions
} from "@/components/editor/autocomplete"
import { useActiveFile } from "../../context/ActiveFileContext"
import { useFileStructure } from "../../context/FileStructureContext"

/* Code Mirror */
import CodeMirror from "@uiw/react-codemirror"
import { materialDark as material } from "@uiw/codemirror-theme-material"
import { autocompletion, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete"
import { keymap } from "@codemirror/view"
import { completionKeymap } from "@codemirror/autocomplete"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { cpp } from "@codemirror/lang-cpp"
import { java } from "@codemirror/lang-java"
import { search } from "@codemirror/search"

const Editor: React.FC<EditorProps> = ({ value }) => {
  const { activeFile, setActiveFileContent } = useActiveFile()
  const { setFileStructure } = useFileStructure()

  useEffect(() => {
    const fetchFileStructure = async () => {
      try {
        const response = await axios.get("http://localhost:3001/files")
        setFileStructure(response.data)
      } catch (error) {
        console.error("Error fetching file structure:", error)
      }
    }

    fetchFileStructure()
  }, [activeFile])

  const handleEditorChange = React.useCallback(
    (value: string) => {
      setActiveFileContent(value) // 변경된 내용을 상태에 저장
    },
    [setActiveFileContent]
  )

  return (
    <div>
      <CodeMirror
        theme={material}
        value={value}
        height="90vh"
        onChange={value => handleEditorChange(value)} // onChange 이벤트 핸들러 추가
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
          closeBrackets(),
          search(), //control+f

          keymap.of([...completionKeymap, ...closeBracketsKeymap]),
          autocompletion({ override: [pythonCompletions, javaCompletions, cppCompletions, javascriptCompletions] }),
          keymap.of(completionKeymap)
        ]}
      />
    </div>
  )
}

export default Editor
