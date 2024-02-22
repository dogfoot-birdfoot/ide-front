import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store"
import { toggleTreeVisible } from "@/pages/IDEPage/FileTreeSlice"

/* Components */
import FileTree from "@/components/filetree/FileTree"
import Editor from "@/components/editor/Editor"
import ChatButton from "@/components/button/ChatButton"
import Loading from "@/components/editor/Loading"
import { ActiveFileProvider, useActiveFile } from "@/context/ActiveFileContext"
import { getFileIconPath } from "@/components/renderingIcons/getFileIconPath"
import TerminalComponent from "@/components/terminal/TerminalComponent"

/* UI */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { FileStructureProvider, useFileStructure } from "context/FileStructureContext"
import { toast } from "react-toastify"

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
  const [initData, setInitData] = useState<any>({ root: { children: [], depth: 0 } })
  const { fileStructure, setFileStructure } = useFileStructure()

  const toggleFileTree = () => {
    dispatch(toggleTreeVisible())
  }

  const isTabActive = (fileData: string) => activeFile === fileData
  const handleTabClick = (tabData: string, tabContent: string) => {
    setActiveFile(tabData)
    setActiveFileContent(tabContent)
  }

  async function saveTab(tabData: string, tabContent: string) {
    if (!fileStructure) {
      console.error("File structure is undefined.")
      return
    }

    // activeFile에 해당하는 객체를 찾습니다.
    let fileToUpdate = null
    let fileKeyToUpdate = null
    for (const key in fileStructure) {
      if (fileStructure[key].data === tabData) {
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
          content: tabContent
        }
      }

      try {
        setFileStructure(updatedFileStructure)
        console.log("FS", updatedFileStructure)
        await axios.put("http://localhost:3001/files", updatedFileStructure)
        console.log("File content updated successfully.")

        const response = await axios.get("http://localhost:3001/files")
        console.log("response", response)
        setInitData(response.data)
      } catch (error) {
        console.error("Error updating file content:", error)
      }
    } else {
      console.error("Active file not found in file structure.")
    }
  }

  const handleRemoveTab = (tabData: string, tabContent: string, tabIsModified: boolean) => {
    if (tabIsModified) {
      toast(
        ({ closeToast }) => (
          <div className="max-w-md w-full bg-white rounded-lg pointer-events-auto flex flex-col items-center">
            <div className="w-full p-4 text-center">
              <p className="text-sm font-medium text-gray-900">저장하시겠습니까?</p>
              <div className="mt-4 flex justify-center space-x-2">
                <button
                  onClick={() => {
                    saveTab(tabData, tabContent)
                    removeTab(tabData)
                    closeToast()
                  }}
                  className="text-sm bg-lime-400 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                >
                  저장
                </button>
                <button
                  onClick={() => {
                    removeTab(tabData)
                    closeToast()
                  }}
                  className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  저장하지 않음
                </button>
              </div>
            </div>
          </div>
        ),
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: true, // 토스트 외부를 클릭하면 토스트가 닫힙니다.
          draggable: false,
          closeButton: false // 필요에 따라 닫기 버튼을 비활성화할 수 있습니다.
        }
      )
    } else {
      removeTab(tabData)
    }
  }

  useEffect(() => {
    // activeFile 값을 기준으로 현재 활성 탭 찾기
    const activeTab = tabs.find(tab => tab.data === activeFile)

    // 현재 활성 탭의 정보 콘솔에 출력
    // console.log(`현재 활성 탭:`, activeTab)
  }, [activeFile, tabs]) // 의존성 배열에 tabs도 포함시켜서 tabs 배열이 변경될 때도 반응하도록 함

  return (
    <div className="flex h-screen bg-slate-600">
      <div className={`transition-width duration-500 ${isFileTreeVisible ? "w-64" : "w-0"} overflow-auto`}>
        <FileTree initialData={initData} setInitialData={setInitData} />
      </div>

      <button
        onClick={toggleFileTree}
        className="mt-5 ml-[-1.25rem] z-20 p-2 bg-gray-700 text-white hover:bg-blue-700 transition-transform duration-500"
        style={{ transform: `translateX(${isFileTreeVisible ? "100%" : "90%"})` }}
      >
        {isFileTreeVisible ? "«" : "»"}
      </button>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatButton />

        <div className="flex-1 overflow-y-auto pl-5 mt-5">
          <div className="flex ml-1">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center p-2 ${isTabActive(tab.data) ? "bg-white text-gray-900" : "bg-gray-700 text-white"}`}
                onClick={() => handleTabClick(tab.data, tab.content)}
              >
                <img
                  src={getFileIconPath(tab.data)} // tab.data를 인자로 넘겨 아이콘 경로를 얻습니다.
                  alt="Icon"
                  style={{ width: "16px", height: "16px", marginRight: "8px" }} // 아이콘 크기와 마진 조정
                />
                <span className="align-middle text-gray-200">
                  {tab.data}
                  {tab.isModified ? <span className="text-2xs align-middle pl-2 select-none">●</span> : ""}
                </span>
                <button
                  onClick={e => {
                    e.stopPropagation() // 버튼 클릭 시 이벤트가 상위로 전파되지 않도록 합니다.
                    handleRemoveTab(tab.data, tab.content, tab.isModified)
                  }}
                  className={tab.isModified ? "ml-1 align-middle" : "ml-3 align-middle"}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            ))}
          </div>

          {tabs.length > 0 ? (
            <Editor data={activeFile} content={activeFileContent} initialData={initData} />
          ) : (
            <Loading />
          )}
        </div>
        <div className=" ml-6">
          <p className="bg-gray-900 text-white pl-5">✨Terminal</p>
          <div style={{ height: "200px", width: "100%" }}>
            <TerminalComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IDEPage
