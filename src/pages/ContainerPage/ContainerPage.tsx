import React, { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import ContainerEditModal from "@/components/modal/ContainerEditModal"
import NewContainerModal from "@/components/modal/NewContainerModal"
import { ContainerFormProps } from "type"
import ContainerForm from "@/components/form/ContainerForm"

const ContainerPage: React.FC = () => {
  const [containers, setContainers] = useState<ContainerFormProps[]>([])
  const [isNewContainerModalOpen, setIsNewContainerModalOpen] = useState<boolean>(false)
  const [isEditContainerModalOpen, setIsEditContainerModalOpen] = useState<boolean>(false)
  const [editingContainer, setEditingContainer] = useState<ContainerFormProps | null>(null)
  const [filteredContainers, setFilteredContainers] = useState<ContainerFormProps[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/projects")
        const projects = response.data

        const containersData: ContainerFormProps[] = projects.map((project: any, index: number) => ({
          id: project.id,
          name: project.name,
          description: project.description,
          language: project.language || "N/A", // 'language' 속성이 없는 경우 'N/A'로 표시합니다.
          lastModified: project.lastModified,
          number: index + 1 // 순차적 번호 할당
        }))

        setContainers(containersData)
      } catch (error) {
        console.error("Error fetching containers:", error)
      }
    }

    fetchContainers()
  }, [])

  useEffect(() => {
    // 검색어에 따라 컨테이너를 필터링하는 로직
    const filtered = containers.filter(container => container.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredContainers(filtered)
  }, [searchTerm, containers]) // 검색어 또는 컨테이너 목록이 변경될 때마다 필터링을 다시 실행

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const handleDelete = async (containerId: number) => {
    // 선택적: 백엔드에서 데이터를 삭제하는 API 요청
    try {
      await axios.delete(`http://localhost:3001/projects/${containerId}`)
      console.log("삭제 성공")
    } catch (error) {
      console.error("삭제 중 오류 발생:", error)
    }

    // UI에서 컨테이너 제거
    setContainers(prevContainers => prevContainers.filter(container => container.id !== containerId))
  }

  const handleEditClick = (container: ContainerFormProps) => {
    setEditingContainer(container)
    setIsEditContainerModalOpen(true)
  }

  const handleSave = async (updatedContainer: ContainerFormProps) => {
    // 수정된 컨테이너 정보를 서버에 저장하는 로직을 구현합니다.
    try {
      // 서버의 해당 컨테이너 정보를 업데이트하는 API 엔드포인트로 PATCH 요청을 보냅니다.
      // 여기서 'http://localhost:3001/projects/${updatedContainer.id}'는 예시 URL입니다.
      // 실제 프로젝트에서는 서버의 API 엔드포인트에 맞게 수정해야 합니다.
      await axios.patch(`http://localhost:3001/projects/${updatedContainer.id}`, updatedContainer)

      // 성공적으로 데이터가 업데이트되면 컨테이너 목록을 새로고침합니다.
      const response = await axios.get("http://localhost:3001/projects")
      const projects = response.data
      const containersData: ContainerFormProps[] = projects.map((project: any, index: number) => ({
        id: project.id,
        name: project.name,
        description: projects.description,
        language: project.language || "N/A",
        lastModified: project.lastModified,
        number: index + 1
      }))
      setContainers(containersData)

      // 모달을 닫습니다.
      setIsEditContainerModalOpen(false)
    } catch (error) {
      console.error("Error updating container:", error)
      // 에러 처리 로직을 추가할 수 있습니다. 예: 사용자에게 에러 메시지를 표시
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userName="홍길동" userEmail="hong@example.com" containers={containers} />
      <div className="flex-grow p-4">
        <Header onAddContainerClick={() => setIsNewContainerModalOpen(true)} onSearch={handleSearch} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredContainers.map(container => (
            <ContainerForm
              key={container.id}
              {...container}
              onDelete={handleDelete}
              onEdit={() => handleEditClick(container)}
            />
          ))}
        </div>
      </div>
      {isEditContainerModalOpen && editingContainer && (
        <ContainerEditModal
          isOpen={isEditContainerModalOpen}
          onClose={() => setIsEditContainerModalOpen(false)}
          container={editingContainer}
          onSave={handleSave}
        />
      )}
      <NewContainerModal
        isOpen={isNewContainerModalOpen}
        onClose={async () => {
          // 모달이 닫힐 때 새로운 데이터 불러오기
          setIsNewContainerModalOpen(false)
          try {
            const response = await axios.get("http://localhost:3001/projects")
            const projects = response.data

            const containersData: ContainerFormProps[] = projects.map((project: any, index: number) => ({
              id: project.id,
              name: project.name,
              language: project.language || "N/A",
              lastModified: project.lastModified,
              number: index + 1 // 순차적 번호 할당
            }))

            setContainers(containersData)
          } catch (error) {
            console.error("Error fetching containers:", error)
          }
        }}
      />
    </div>
  )
}

export default ContainerPage
