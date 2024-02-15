import React, { useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { useActiveFile } from "../../context/ActiveFileContext"
import { materialDark as material } from "@uiw/codemirror-theme-material"
import { autocompletion } from "@codemirror/autocomplete"
import { keymap } from "@codemirror/view"
import { completionKeymap } from "@codemirror/autocomplete"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { cpp } from "@codemirror/lang-cpp"
import { java } from "@codemirror/lang-java"
import { cppCompletions, javaCompletions, pythonCompletions } from "./autocomplete"
import axios from "axios"
import { useFileStructure } from "context/FileStructureContext"

interface EditorProps {
  value: string // 'value' prop 타입을 string으로 정의
}

const Editor: React.FC<EditorProps> = ({ value }) => {
  const { activeFile, activeFileContent, setActiveFileContent } = useActiveFile()
  const { fileStructure, setFileStructure } = useFileStructure()

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

  const saveFileContent = async () => {
    if (!fileStructure) {
      console.error("File structure is undefined.")
      return
    }

    // activeFile에 해당하는 객체를 찾습니다.
    let fileToUpdate = null
    let fileKeyToUpdate = null
    for (const key in fileStructure) {
      if (fileStructure[key].data === activeFile) {
        fileToUpdate = fileStructure[key]
        fileKeyToUpdate = key
        break
      }
    }

    // 찾은 객체의 content 속성을 업데이트합니다.
    if (fileToUpdate && fileKeyToUpdate) {
      const updatedFileStructure = {
        ...fileStructure,
        [fileKeyToUpdate]: {
          ...fileToUpdate,
          content: activeFileContent
        }
      }

      try {
        await axios.put("http://localhost:3001/files", updatedFileStructure)
        console.log("File content updated successfully.")
      } catch (error) {
        console.error("Error updating file content:", error)
      }
    } else {
      console.error("Active file not found in file structure.")
    }
  }

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
          autocompletion({ override: [pythonCompletions, javaCompletions, cppCompletions] }),
          keymap.of(completionKeymap)
        ]}
      />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={saveFileContent}>Save</button>
      </div>
    </div>
  )
}

export default Editor
