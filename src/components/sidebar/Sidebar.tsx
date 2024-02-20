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

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faRocket} className="text-xl text-lime-700" />
            <h3 className="font-semibold ml-2">스페이스</h3>{" "}
          </div>
          <button onClick={() => setIsSpaceExpanded(!isSpaceExpanded)}>
            <FontAwesomeIcon
              icon={isSpaceExpanded ? faCircleChevronUp : faCircleChevronDown}
              className="text-gray-600"
            />
          </button>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out ${isSpaceExpanded ? "max-h-96" : "max-h-0"} overflow-hidden`}
        >
          <p className="cursor-pointer mt-4" onClick={() => setIsContainersExpanded(!isContainersExpanded)}>
            모든 컨테이너
          </p>
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
