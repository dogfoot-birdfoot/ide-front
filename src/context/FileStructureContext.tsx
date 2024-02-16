import React, { createContext, useContext, useState, ReactNode } from "react"

interface FileStructureContextType {
  fileStructure: any // 필요에 따라 더 구체적인 타입으로 변경하세요
  setFileStructure: React.Dispatch<React.SetStateAction<any>> // setState 액션 타입
}

const FileStructureContext = createContext<FileStructureContextType | undefined>(undefined)

export const useFileStructure = () => {
  const context = useContext(FileStructureContext)
  if (!context) throw new Error("useFileStructure must be used within a FileStructureProvider")
  return context
}

interface FileStructureProviderProps {
  children: ReactNode
}

export const FileStructureProvider: React.FC<FileStructureProviderProps> = ({ children }) => {
  const [fileStructure, setFileStructure] = useState<any>(null)

  return (
    <FileStructureContext.Provider value={{ fileStructure, setFileStructure }}>
      {children}
    </FileStructureContext.Provider>
  )
}
