import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleChevronDown, faCircleChevronUp, faRocket } from "@fortawesome/free-solid-svg-icons"
import { SidebarProps } from "type"

const Sidebar: React.FC<SidebarProps> = ({ userName, userEmail, containers }) => {
  const [isSpaceExpanded, setIsSpaceExpanded] = useState(true)
  const [isContainersExpanded, setIsContainersExpanded] = useState(true)

  return (
    <div className="h-screen w-64 bg-gray-200 p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">{userName}</h2>
        <p className="text-sm">{userEmail}</p>
        <button className="mt-3 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600">내 정보 관리</button>
      </div>
      <hr className="my-4 border-t border-gray-400" />
      {/* Space Section */}
      <div className="mt-4">
        {" "}
        {/* 여기에 mt-4를 추가하여 스페이스 섹션과 유저 정보 섹션 사이에 간격을 추가 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {" "}
            {/* 로케트 아이콘과 스페이스 텍스트를 flex container로 묶어서 붙임 */}
            <FontAwesomeIcon icon={faRocket} className="text-xl text-lime-700" />
            <h3 className="font-semibold ml-2">스페이스</h3>{" "}
            {/* ml-2를 추가하여 아이콘과 텍스트 사이에 약간의 간격을 추가 */}
          </div>
          <button onClick={() => setIsSpaceExpanded(!isSpaceExpanded)}>
            <FontAwesomeIcon
              icon={isSpaceExpanded ? faCircleChevronUp : faCircleChevronDown}
              className="text-gray-600"
            />
          </button>
        </div>
        {/* Animate Space Content */}
        <div
          className={`transition-all duration-500 ease-in-out ${isSpaceExpanded ? "max-h-96" : "max-h-0"} overflow-hidden`}
        >
          <p className="cursor-pointer mt-4" onClick={() => setIsContainersExpanded(!isContainersExpanded)}>
            모든 컨테이너
          </p>{" "}
          {/* mt-4를 추가하여 스페이스 텍스트와 모든 컨테이너 텍스트 사이에 간격을 추가 */}
          {/* Animate Containers List */}
          <div
            className={`transition-all duration-500 ease-in-out ${isContainersExpanded ? "max-h-48" : "max-h-0"} overflow-hidden`}
          >
            <ul>
              {containers.map((container, index) => (
                <li key={index} className="ml-4">
                  {container.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
