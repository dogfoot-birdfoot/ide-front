import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { ContainerFormProps } from "type"
import { toast } from "react-toastify"

import DeleteNotification from "@/components/sidebar/DeleteNotification"

const getLanguageIcon = (language: string) => {
  switch (language) {
    case "Java":
      return "/java.png"
    case "JavaScript":
      return "/js.png"
    case "Python":
      return "/python.png"
    case "C++":
      return "/cpp.png"
    default:
      return "/file.png"
  }
}

const ContainerForm: React.FC<ContainerFormProps> = ({
  id,
  number,
  language,
  lastModified,
  description,
  name,
  onEdit,
  onDelete
}) => {
  const navigation = useNavigate()

  const handleDeleteClick = () => {
    toast(<DeleteNotification onDelete={onDelete} id={id} />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: true,
      draggable: false,
      closeButton: false
    })
  }
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-400 flex flex-col justify-between h-55 relative">
      <button onClick={onEdit} className="absolute top-4 right-12 text-gray-400 hover:text-gray-600">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>

      {/* 삭제 버튼에 onDelete 함수 연결, 버튼 위치 수정을 위해 right-4 사용 */}
      <button onClick={handleDeleteClick} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div>
        <div className="text-gray-800 font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-600 text-base">#{number} 컨테이너</p>
        <div className="flex items-center text-gray-600 text-base">
          <img src={getLanguageIcon(language)} alt={`${language} Icon`} style={{ width: "20px", height: "20px" }} />
          <p className="pl-2">{language}</p>
        </div>
        <p className="text-gray-600 text-sm">최근 수정: {lastModified}</p>
        <p className="text-gray-600 text-sm">설명: {description}</p> {/* 설명 추가 */}
      </div>
      <button
        // 추후에 동적으로 연결된 엔드포인트로 이동하도록 수정
        onClick={() => navigation("/ide")}
        className="bg-lime-500 text-white text-sm px-4 py-2 rounded hover:bg-lime-600 mt-4 self-start"
      >
        시작하기
      </button>
    </div>
  )
}

export default ContainerForm
