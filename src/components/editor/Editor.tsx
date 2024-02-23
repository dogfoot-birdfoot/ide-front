import React, { useEffect } from "react"
import axios from "axios"
import { EditorProps, Tab } from "type"

import {
  cppCompletions,
  javaCompletions,
  javascriptCompletions,
  pythonCompletions
} from "@/components/editor/autocomplete"
import { useActiveFile } from "@/context/ActiveFileContext"
import { useFileStructure } from "@/context/FileStructureContext"

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

const Editor: React.FC<EditorProps> = ({ data, content, initialData }) => {
  const { tabs, activeFile, setActiveFileContent } = useActiveFile()
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
    // tabs를 parameter로 추가하지 않으면 tabs가 업데이트 되지 않음
    (data: string, activeContent: string, tabs: Tab[]) => {
      // 업데이트 된 tab에 대한 수정

      const tabIndex = tabs.findIndex(tab => tab.data === data)
      let isTabModified = true

      // 현재 선택한 tab과 초기 content를 비교해 바뀐지 확인
      const objKeys = Object.keys(initialData)
      for (const key in objKeys) {
        if (initialData[objKeys[key]].data === data && initialData[objKeys[key]].content === activeContent) {
          isTabModified = false
        }
      }

      if (tabIndex !== undefined) {
        tabs[tabIndex] = {
          data: data,
          content: activeContent,
          id: tabs[tabIndex].id,
          index: tabs[tabIndex].index,
          isModified: isTabModified
        }
      }

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
