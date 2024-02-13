import React, { useState } from "react"
import axios from "axios"

interface NewContainerModalProps {
  isOpen: boolean
  onClose: () => void
}

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, "0")
const day = String(currentDate.getDate()).padStart(2, "0")
const hours = String(currentDate.getHours()).padStart(2, "0")
const minutes = String(currentDate.getMinutes()).padStart(2, "0")
const seconds = String(currentDate.getSeconds()).padStart(2, "0")

const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
const NewContainerModal: React.FC<NewContainerModalProps> = ({ isOpen, onClose }) => {
  const [newContainer, setNewContainer] = useState({
    name: "",
    language: "Java",
    description: "",
    lastModified: formattedDateTime
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setNewContainer({ ...newContainer, [name]: value })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewContainer({ ...newContainer, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:3001/projects", newContainer)
      onClose()
    } catch (error) {
      console.error("Error adding container:", error)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg md:w-1/2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">새 컨테이너 추가</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={newContainer.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  언어
                </label>
                <select
                  name="language"
                  value={newContainer.language}
                  onChange={handleSelectChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="C++">C++</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  설명
                </label>
                <textarea
                  name="description"
                  value={newContainer.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                >
                  취소
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  저장
                </button>
              </div>
            </form>
          </div>
          <div className="fixed inset-0 z-10" onClick={onClose}></div> {/* 모달 외부 클릭 시 닫기 */}
        </div>
      )}
    </>
  )
}

export default NewContainerModal
