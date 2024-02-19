export type FileStructureChangeCallback = (newFileStructure: any) => void
export interface ContainerFormProps {
  id: number
  name: string
  number: number
  language: string
  lastModified: string
  description: string
  onEdit: () => void // 수정 버튼 클릭 이벤트 핸들러를 props로 추가합니다.
  onDelete: (id: number) => void // 삭제 함수 prop 추가
}

export type FormProps = {
  title: string
  getDataForm: (email: string, password: string) => void
}

export type Inputs = {
  email: string
  password: string
}
export interface HeaderProps {
  onAddContainerClick: () => void
  onSearch: (searchTerm: string) => void // 검색 함수 prop 추가
}

export interface ContainerEditModalProps {
  isOpen: boolean
  onClose: () => void
  container: any // 수정할 컨테이너의 정보를 받습니다. 타입은 프로젝트에 맞게 조정하세요.
  onSave: (container: any) => void // 수정된 컨테이너 정보를 저장하는 함수입니다.
}

export interface NewContainerModalProps {
  isOpen: boolean
  onClose: () => void
}

export type SidebarProps = {
  userName: string
  userEmail: string
  containers: Containers
}
export type Container = {
  id: number | string
  name: string
}
export type Containers = Container[]

export type messageListProps = {
  id: number
  text: string
}

export type messageProps = {
  id: number
  text: string
}
export interface ContextMenuProps {
  onDelete: () => void
  x: number
  y: number
}
export interface ContextMenuState {
  x: number
  y: number
  itemIndex: string | number
}
export interface EditorProps {
  data: string
  content: string // 'value' prop 타입을 string으로 정의
}

export interface Tab {
  data: string
  content: string
  id: number
  index: string
}
