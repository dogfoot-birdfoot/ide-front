import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"

interface Tab {
  data: string
  content: string
  id: number
}

interface ActiveFileContextType {
  activeFile: string
  setActiveFile: Dispatch<SetStateAction<string>>
  addTab: (tab: Tab) => void
  removeTab: (tabName: string) => void
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
  const [activeFile, setActiveFile] = useState<string>("")
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeFileContent, setActiveFileContent] = useState<string>("")

  const addTab = (newTab: Tab) => {
    setTabs(prevTabs => [...prevTabs, newTab])
  }

  const removeTab = (tabData: string) => {
    setTabs(prevTabs => {
      const tabIndex = prevTabs.findIndex(tab => tab.data === tabData)
      const updatedTabs = prevTabs.filter(tab => tab.data !== tabData)
      console.log(updatedTabs)
      console.log(activeFileContent)
      console.log(activeFile)
      console.log(tabData)

      if (activeFile === tabData && updatedTabs.length > 0) {
        const newActiveIndex = tabIndex >= updatedTabs.length ? updatedTabs.length - 1 : tabIndex
        const newActiveTab = updatedTabs[newActiveIndex]
        console.log("dddd")
        console.log(newActiveTab.data)
        console.log(newActiveTab.content)
        setActiveFile(newActiveTab.data)
        setActiveFileContent(newActiveTab.content)
      } else if (updatedTabs.length === 0) {
        setActiveFile("")
        setActiveFileContent("")
      }

      return updatedTabs
    })
  }

  return (
    <ActiveFileContext.Provider
      value={{
        activeFile,
        setActiveFile,
        addTab,
        removeTab,
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
