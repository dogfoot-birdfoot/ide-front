import React, { useState } from "react"
import Editor from "@/components/editor/Editor"
import FileTree from "@/components/editor/filetree/FileTree"
import { EditorProps } from "type"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import data from "data.json"
import { DataStructure } from "type"

const IDEPage = () => {
  const typedData: DataStructure = data
  const [tabs, setTabs] = useState<EditorProps["fileTabs"]>([])
  const [activeTabIndex, setActiveTabIndex] = useState<EditorProps["activeTabIndex"]>(-1)

  const handleFileSelect = (fileName: string) => {
    const fileItem = typedData.files[fileName] // data.json에서 파일 항목 가져오기
    const fileContent = fileItem?.content || "" // 파일 내용 가져오기, 없으면 빈 문자열 사용

    const fileIndex = tabs.findIndex(tab => tab.activeFile === fileName)

    if (fileIndex !== -1) {
      setActiveTabIndex(fileIndex) // 파일이 이미 열린 탭에 있다면 해당 탭을 활성화
    } else {
      const newTab = {
        // 새 탭 추가
        activeFile: fileName,
        fileContents: { [fileName]: fileContent }, // 파일 내용 설정
        activeTabIndex: tabs.length
      }
      setTabs([...tabs, newTab]) // 상태 업데이트
      setActiveTabIndex(tabs.length) // 새로운 탭 인덱스로 설정
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
