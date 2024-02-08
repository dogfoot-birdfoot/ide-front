export type Container = {
  id: number
  name: string
}
export type Containers = Container[]

export type SidebarProps = {
  userName: string
  userEmail: string
  containers: Containers
}

export type ContainerFormProps = {
  number: number
  language: string
  lastModified: string
  name: string
}

export interface FileItem {
  index: string
  isFolder: boolean
  children: string[]
  data: string
  content?: string
  name: string
  filetype?: string
  lastmodified?: number
}
export interface EditorProps {
  fileTabs: {
    activeFile: string
    fileContents: { [fileName: string]: string }
    activeTabIndex: number
  }[]
  activeTabIndex: number
}
export interface FileTreeProps {
  onFileSelect: (fileName: string, fileContent: string) => void
}
