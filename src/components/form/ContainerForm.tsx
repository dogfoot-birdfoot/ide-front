import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { ContainerFormProps } from "type"

const ContainerForm: React.FC<ContainerFormProps> = ({ number, language, lastModified, name }) => {
  const handleEditClick = () => {
    //edit modal창 띄위기
  }
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-400 flex flex-col justify-between h-48 relative">
      <button onClick={handleEditClick} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <div>
        <div className="text-gray-800 font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-600 text-sm">#{number} 컨테이너</p>
        <p className="text-gray-600 text-sm">{language}</p>
        <p className="text-gray-600 text-sm">최근 수정: {lastModified}</p>
      </div>
      <button className="bg-lime-500 text-white text-sm px-4 py-2 rounded hover:bg-lime-600 mt-4 self-start">
        시작하기
      </button>
    </div>
  )
}

export default ContainerForm
