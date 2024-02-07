import React, { useState } from "react"
import Editor from "@/components/editor/Editor"
import FileTree from "@/components/editor/filetree/FileTree"
import { EditorProps } from "type"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const IDEPage = () => {
  const [tabs, setTabs] = useState<EditorProps["fileTabs"]>([]) // 열린 탭들의 상태
  const [activeTabIndex, setActiveTabIndex] = useState<EditorProps["activeTabIndex"]>(-1) // 현재 활성화된 탭의 인덱스

  // 서버랑 연동하면 없어질 하드코딩 부분
  const fileContents: { [fileName: string]: string } = {
    "file1.js": "// File 1 content\nconsole.log('File 1');",
    "file2.js": "// File 2 content\nconsole.log('File 2');"
  }

  const handleFileSelect = (fileName: string) => {
    // 매개변수 수정
    const fileContent = fileContents[fileName] || "" // 파일이 없을 경우를 대비해 기본값 설정
    const fileIndex = tabs.findIndex(tab => tab.activeFile === fileName)
    if (fileIndex !== -1) {
      // 파일이 이미 열린 탭에 있다면 해당 탭을 활성화
      setActiveTabIndex(tabs[fileIndex].activeTabIndex)
    } else {
      // 새 탭 추가
      const newTab = {
        activeFile: fileName,
        fileContents: typeof fileContent === "string" ? { [fileName]: fileContent } : fileContent,
        activeTabIndex: tabs.length
      }
      setTabs([...tabs, newTab])
      setActiveTabIndex(newTab.activeTabIndex) // 새 탭을 활성화
    }
  }

  const closeTab = (index: number) => {
    const newTabs = tabs.filter((_, i) => i !== index)
    setTabs(newTabs)
    if (index === activeTabIndex && newTabs.length > 0) {
      setActiveTabIndex(0) // 첫 번째 탭을 활성화
    } else if (newTabs.length === 0) {
      setActiveTabIndex(-1) // 탭이 없으면 활성화된 탭 없음
    }
  }

  return (
    <div className="flex bg-customGray">
      <div className="w-1/5 bg-customGray p-4 border-r">
        <FileTree onFileSelect={handleFileSelect} />
      </div>
      <div className="w-3/4 p-4">
        <div className="tabs flex bg-customGray">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab flex items-center justify-between px-4 py-2 bg-gray-800 text-white cursor-pointer ${index === activeTabIndex ? "bg-gray-900" : ""}`}
              onClick={() => setActiveTabIndex(index)}
            >
              <span className="mr-4">{tab.activeFile}</span>
              <button onClick={() => closeTab(index)} className="text-white">
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          ))}
        </div>

        {tabs.length > 0 && activeTabIndex !== -1 && <Editor fileTabs={tabs} activeTabIndex={activeTabIndex} />}
      </div>
    </div>
  )
}
export default IDEPage
