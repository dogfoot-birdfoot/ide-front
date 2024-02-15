import React from "react"
import FileTree from "@/components/filetree/FileTree"
import Editor from "@/components/editor/Editor"
import ChatButton from "@/components/button/ChatButton"
import { ActiveFileProvider, useActiveFile } from "../../context/ActiveFileContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FileStructureProvider } from "context/FileStructureContext"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"
import { toggleTreeVisible } from "./FileTreeSlice"
import Loading from "@/components/editor/Loading"

const IDEPage = () => {
  return (
    <ActiveFileProvider>
      <FileStructureProvider>
        <IDEContent />
      </FileStructureProvider>
    </ActiveFileProvider>
  )
}

const IDEContent = () => {
  const isFileTreeVisible = useSelector((state: RootState) => state.fileTree.value)
  const dispatch = useDispatch()
  const { tabs, setTabs, activeFile, setActiveFile, activeFileContent, setActiveFileContent } = useActiveFile()

  const toggleFileTree = () => {
    dispatch(toggleTreeVisible())
  }

  const renderContent = () => {
    if (activeFile === "") {
      // 아무것도 선택하지 않았을 때
      return <Loading />
    } else if (activeFileContent === "") {
      // 파일은 선택했으나 내용이 비어있을 때
      return <Editor value="" />
    } else {
      // 파일 선택 및 내용이 있을 때
      return <Editor value={activeFileContent} />
    }
  }

  const addTab = (fileData: string, fileContent: string) => {
    const isTabOpen = tabs.some(tab => tab.data === fileData)
    if (!isTabOpen) {
      setTabs(prevTabs => [...prevTabs, { data: fileData, content: fileContent }])
    }
    setActiveFile(fileData)
    setActiveFileContent(fileContent)
  }

  const removeTab = (fileData: string) => {
    setTabs(prevTabs => prevTabs.filter(tab => tab.data !== fileData))
    if (activeFile === fileData) {
      setActiveFile("")
      setActiveFileContent("")
    }
  }

  const isTabActive = (fileData: string) => activeFile === fileData

  return (
    <div className="flex h-screen bg-slate-600">
      <div className={`transition-width duration-500 ${isFileTreeVisible ? "w-64" : "w-0"} overflow-auto`}>
        <FileTree />
      </div>

      <button
        onClick={toggleFileTree}
        className="mt-5 ml-[-1.25rem] z-20 p-2 bg-gray-700 text-white hover:bg-blue-700 transition-transform duration-500"
        style={{ transform: `translateX(${isFileTreeVisible ? "100%" : "0"})` }}
      >
        {isFileTreeVisible ? "«" : "»"}
      </button>

      <ChatButton />

      <div className="flex-1 overflow-y-auto pl-5 mt-5">
        <div className="flex ml-2">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`p-2 border ${isTabActive(tab.data) ? "bg-lime-500 text-white" : "bg-gray-700 text-white"}`}
              onClick={() => {
                setActiveFile(tab.data)
                setActiveFileContent(tab.content)
              }}
            >
              {tab.data}
              <button onClick={() => removeTab(tab.data)} className="ml-3">
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  )
}

export default IDEPage
