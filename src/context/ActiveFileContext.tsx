import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { RootState } from "store"
import { Tab } from "type"

interface ActiveFileContextType {
  activeFile: string
  setActiveFile: Dispatch<SetStateAction<string>>
  addTab: (tab: Tab) => void
  removeTab: (tabName: string) => void
  handleRemoveTab: (tabName: string, tabContent: string) => void
  tabs: Tab[]
  setTabs: Dispatch<SetStateAction<Tab[]>>
  activeFileContent: string
  setActiveFileContent: Dispatch<SetStateAction<string>>
}

const ActiveFileContext = createContext<ActiveFileContextType | undefined>(undefined)

export const useActiveFile = () => {
  const context = useContext(ActiveFileContext)
  if (!context) {
    throw new Error("useActiveFile must be used within an ActiveFileProvider")
  }
  return context
}

interface ActiveFileProviderProps {
  children: ReactNode
}

export const ActiveFileProvider: React.FC<ActiveFileProviderProps> = ({ children }) => {
  const initialData = useSelector((state: RootState) => state.initialData.value)
  const [activeFile, setActiveFile] = useState<string>("")
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeFileContent, setActiveFileContent] = useState<string>("")

  const addTab = (newTab: Tab) => {
    setTabs(prevTabs => [...prevTabs, newTab])
  }

  const isTabModified = (tabData: string, tabContent: string) => {
    const objectKeys = Object.keys(initialData)
    for (const key in objectKeys) {
      // 현재 탭에 해당하는 파일을 찾음, tabs의 Content가 항상 저장될 시 기능 추가
      if (initialData[objectKeys[key]].data === tabData) {
        console.log(initialData[objectKeys[key]].content === tabContent)
      }
    }

    console.log("tabs : ", tabs)
  }

  const removeTab = (tabData: string) => {
    setTabs(prevTabs => {
      const tabIndex = prevTabs.findIndex(tab => tab.data === tabData)
      const updatedTabs = prevTabs.filter(tab => tab.data !== tabData)

      if (activeFile === tabData && updatedTabs.length > 0) {
        const newActiveIndex = tabIndex >= updatedTabs.length ? updatedTabs.length - 1 : tabIndex
        const newActiveTab = updatedTabs[newActiveIndex]

        setActiveFile(newActiveTab.data)
        setActiveFileContent(newActiveTab.content)
      } else if (updatedTabs.length === 0) {
        setActiveFile("")
        setActiveFileContent("")
      }

      return updatedTabs
    })
  }

  const handleRemoveTab = (tabData: string, tabContent: string) => {
    toast(
      ({ closeToast }) => (
        <div className="max-w-md w-full bg-white rounded-lg pointer-events-auto flex flex-col items-center">
          <div className="w-full p-4 text-center">
            <p className="text-sm font-medium text-gray-900">저장하시겠습니까?</p>
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={() => {
                  isTabModified(tabData, tabContent)
                  removeTab(tabData)
                  closeToast()
                }}
                className="text-sm bg-lime-400 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
              >
                저장
              </button>
              <button
                onClick={closeToast}
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
  }

  return (
    <ActiveFileContext.Provider
      value={{
        activeFile,
        setActiveFile,
        addTab,
        removeTab,
        handleRemoveTab,
        tabs,
        setTabs,
        activeFileContent,
        setActiveFileContent
      }}
    >
      {children}
    </ActiveFileContext.Provider>
  )
}
