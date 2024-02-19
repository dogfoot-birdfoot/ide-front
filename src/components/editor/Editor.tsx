import React, { useEffect } from "react"
import axios from "axios"

import { EditorProps, Tab } from "type"
import { cppCompletions, javaCompletions, pythonCompletions } from "@/components/editor/autocomplete"
import { useActiveFile } from "../../context/ActiveFileContext"
import { useFileStructure } from "../../context/FileStructureContext"

/* Code Mirror */
import CodeMirror from "@uiw/react-codemirror"
import { materialDark as material } from "@uiw/codemirror-theme-material"
import { autocompletion } from "@codemirror/autocomplete"
import { keymap } from "@codemirror/view"
import { completionKeymap } from "@codemirror/autocomplete"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { cpp } from "@codemirror/lang-cpp"
import { java } from "@codemirror/lang-java"
import { useSelector } from "react-redux"
import { RootState } from "store"

const Editor: React.FC<EditorProps> = ({ data, content }) => {
  const { tabs, setTabs, activeFile, setActiveFileContent } = useActiveFile()
  const { setFileStructure } = useFileStructure()
  const initialData = useSelector((state: RootState) => state.initialData.value)

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
    // tabs를 parameter로 추가하지 않으면 tabs가 업데이트 되지 않음
    (data: string, activeContent: string, tabs: Tab[]) => {
      // 업데이트 된 tab에 대한 수정
      setTabs(
        tabs.map(tab =>
          tab.data === data
            ? { data: tab.data, content: activeContent, id: tab.id, index: tab.index, isModified: true }
            : tab
        )
      )
      // tab에서 content가 바뀐지 확인

      console.log(initialData)
      // setTabs(
      //   tabs.map(tab =>
      //     tab.data === data
      //       ? activeContent !== content
      //         ? { data: tab.data, content: activeContent, id: tab.id, index: tab.index, isModified: true }
      //         : { data: tab.data, content: activeContent, id: tab.id, index: tab.index, isModified: false }
      //       : tab
      //   )
      // )

      setActiveFileContent(activeContent) // 변경된 내용을 상태에 저장
    },
    [setActiveFileContent]
  )

  return (
    <div>
      <CodeMirror
        theme={material}
        value={content}
        height="90vh"
        onChange={value => handleEditorChange(data, value, tabs)} // onChange 이벤트 핸들러 추가
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
    </div>
  )
}

export default Editor
