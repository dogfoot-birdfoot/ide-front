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

export type TreeItem = {
  index: string
  isFolder?: boolean
  children: string[]
  data: string
}
