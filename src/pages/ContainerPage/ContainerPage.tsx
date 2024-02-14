import React, { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "../../components/sidebar/Sidebar"
import ContainerForm, { ContainerFormProps } from "../../components/form/ContainerForm"
import Header from "../../components/header/Header"
import { Link } from "react-router-dom"
import ContainerEditModal from "@/components/form/ContainerEditModal"
import NewContainerModal from "@/components/form/NewContainerModal"

const ContainerPage: React.FC = () => {
  const [containers, setContainers] = useState<ContainerFormProps[]>([])
  const [isNewContainerModalOpen, setIsNewContainerModalOpen] = useState<boolean>(false)
  const [isEditContainerModalOpen, setIsEditContainerModalOpen] = useState<boolean>(false)

  const [editingContainer, setEditingContainer] = useState<ContainerFormProps | null>(null)

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/projects")
        const projects = response.data

        const containersData: ContainerFormProps[] = projects.map((project: any, index: number) => ({
          id: project.id,
          name: project.name,
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
        <Header onAddContainerClick={() => setIsNewContainerModalOpen(true)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {containers.map(container => (
            <ContainerForm key={container.id} {...container} onEdit={() => handleEditClick(container)} />
          ))}
        </div>
        <Link to={"/ide"}>IDE 페이지 접근하기</Link>
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

      {/* 모달 추가 */}
    </div>
  )
}

export default ContainerPage