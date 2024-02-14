import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react"

interface Tab {
  data: string
  content: string
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
    setTabs(prevTabs => prevTabs.filter(tab => tab.data !== tabData))
    // If the active file is being closed, clear the active content.
    if (activeFile === tabData) {
      setActiveFile("")
      setActiveFileContent("")
    }
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
