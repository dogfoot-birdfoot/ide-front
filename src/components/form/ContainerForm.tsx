import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faJava, faJsSquare, faPython, faCuttlefish } from "@fortawesome/free-brands-svg-icons"
import { faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons"
import { faFileCode } from "@fortawesome/free-regular-svg-icons" // 기본 아이콘

export interface ContainerFormProps {
  id: string
  name: string
  number: number
  language: string
  lastModified: string
  onEdit: () => void // 수정 버튼 클릭 이벤트 핸들러를 props로 추가합니다.
}

const getLanguageIcon = (language: string) => {
  switch (language) {
    case "Java":
      return faJava
    case "JavaScript":
      return faJsSquare
    case "Python":
      return faPython
    case "C++":
      return faCuttlefish // C++에 대한 아이콘으로 faCuttlefish 사용(실제 C++ 아이콘은 없음)
    default:
      return faFileCode // 기본 아이콘
  }
}

const ContainerForm: React.FC<ContainerFormProps> = ({ id, number, language, lastModified, name, onEdit }) => {
  const languageIcon = getLanguageIcon(language)

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-400 flex flex-col justify-between h-48 relative">
      <button onClick={onEdit} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <button className="absolute top-4 right-12 text-gray-400 hover:text-gray-600">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div>
        <div className="text-gray-800 font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-600 text-base">#{number} 컨테이너</p>
        <div className="flex items-center text-gray-600 text-base">
          <FontAwesomeIcon icon={languageIcon} className="mr-2" />
          {language}
        </div>
        <p className="text-gray-600 text-sm">최근 수정: {lastModified}</p>
      </div>
      <button className="bg-lime-500 text-white text-sm px-4 py-2 rounded hover:bg-lime-600 mt-4 self-start">
        시작하기
      </button>
    </div>
  )
}

export default ContainerForm
