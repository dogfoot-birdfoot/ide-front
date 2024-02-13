import React, { useState } from "react"

interface ContainerEditModalProps {
  isOpen: boolean
  onClose: () => void
  container: any // 수정할 컨테이너의 정보를 받습니다. 타입은 프로젝트에 맞게 조정하세요.
  onSave: (container: any) => void // 수정된 컨테이너 정보를 저장하는 함수입니다.
}

const ContainerEditModal: React.FC<ContainerEditModalProps> = ({ isOpen, onClose, container, onSave }) => {
  const [editedContainer, setEditedContainer] = useState(container)

  if (!isOpen) return null

  // 모달 바깥쪽 클릭시 모달 닫기
  const handleOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEditedContainer({ ...editedContainer, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSave(editedContainer)
  }
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 선택한 언어를 가져옵니다.
    const selectedLanguage = event.target.value

    // 선택한 언어에 따라 수정된 컨테이너 정보를 업데이트합니다.
    setEditedContainer((prevState: any) => ({
      ...prevState,
      language: selectedLanguage
    }))

    onSave(editedContainer)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleOutsideClick}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">컨테이너 정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={editedContainer.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              언어
            </label>
            <select
              name="language"
              value={editedContainer.language}
              onChange={handleLanguageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              {/* 필요한 경우 추가 언어 옵션을 여기에 추가할 수 있습니다. */}
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-l"
            >
              닫기
            </button>
            <button type="submit" className="bg-lime-700 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded-r">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContainerEditModal
