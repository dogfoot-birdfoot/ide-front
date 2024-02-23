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
          language: project.language || "N/A",
          lastModified: project.lastModified,
          number: index + 1
        }))

        setContainers(containersData)
      } catch (error) {
        console.error("Error fetching containers:", error)
      }
    }

    fetchContainers()
  }, [isNewContainerModalOpen, isEditContainerModalOpen]) // 모달 상태 변경 시 컨테이너 목록 새로고침

  useEffect(() => {
    const filtered = containers.filter(container => container.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredContainers(filtered)
  }, [searchTerm, containers])

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const handleDelete = async (containerId: number) => {
    try {
      await axios.delete(`http://localhost:3001/projects/${containerId}`)
      console.log("삭제 성공")
      setContainers(prevContainers => prevContainers.filter(container => container.id !== containerId))
    } catch (error) {
      console.error("삭제 중 오류 발생:", error)
    }
  }

  const handleEditClick = (container: ContainerFormProps) => {
    setEditingContainer(container)
    setIsEditContainerModalOpen(true)
  }

  const handleSave = async (updatedContainer: ContainerFormProps) => {
    try {
      await axios.patch(`http://localhost:3001/projects/${updatedContainer.id}`, updatedContainer)
      setIsEditContainerModalOpen(false) // 성공적으로 업데이트 후 모달 닫기
    } catch (error) {
      console.error("Error updating container:", error)
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
        onClose={() => setIsNewContainerModalOpen(false)} // 모달 닫기만 처리하고, 데이터 갱신은 useEffect에서 처리
      />
    </div>
  )
}

export default ContainerPage
