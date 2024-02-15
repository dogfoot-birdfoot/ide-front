import React, { useEffect } from "react"
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
  const { tabs, activeFile, setActiveFile, activeFileContent, setActiveFileContent, removeTab } = useActiveFile()

  const toggleFileTree = () => {
    dispatch(toggleTreeVisible())
  }

  const isTabActive = (fileData: string) => activeFile === fileData

  useEffect(() => {
    console.log("Active file changed:", activeFile)
  }, [activeFile])

  useEffect(() => {
    console.log("Active file content changed:", activeFileContent)
  }, [activeFileContent])

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
        <div className="flex ml-1">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`p-2  ${isTabActive(tab.data) ? "bg-white text-gray-900" : "bg-gray-700 text-white"}`}
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

        {tabs.length > 0 ? <Editor value={activeFileContent} /> : <Loading />}
      </div>
    </div>
  )
}

export default IDEPage
