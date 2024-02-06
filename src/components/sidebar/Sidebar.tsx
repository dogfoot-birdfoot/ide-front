import React, { useState } from "react"
import { Link } from "react-router-dom"
import { SidebarProps } from "../../type"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { faRocket } from "@fortawesome/free-solid-svg-icons"

const Sidebar: React.FC<SidebarProps> = ({ userName, userEmail, containers }) => {
  const [isSpaceExpanded, setIsSpaceExpanded] = useState(true)
  const [isContainersExpanded, setIsContainersExpanded] = useState(true)

  return (
    <div className="h-screen w-64 bg-gray-200 p-5">
      {/* 유저 정보 섹션 */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold">{userName}</h2>
        <p className="text-sm">{userEmail}</p>
        <Link to="/profile">
          <button className="mt-3 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600">내 정보 페이지</button>
        </Link>
      </div>

      {/* 유저 정보와 스페이스 섹션 사이의 실선 */}
      <hr className="my-4 border-t border-gray-400" />

      {/* 스페이스 섹션 */}
      <div>
        <div className="flex justify-between">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faRocket} className="text-lg text-gray-500 mr-2 cursor-pointer" />
            <h3 className="font-semibold mb-2">스페이스</h3>
          </div>
          <div>
            <button onClick={() => setIsSpaceExpanded(!isSpaceExpanded)} className="text-xs">
              {isSpaceExpanded ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </button>
          </div>
        </div>

        {isSpaceExpanded && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="cursor-pointer" onClick={() => setIsContainersExpanded(!isContainersExpanded)}>
                모든 컨테이너
              </p>
            </div>
            {isContainersExpanded && (
              <ul className="list-none pl-0">
                {containers.map((container, index) => (
                  <li key={index} className="ml-4">
                    {container.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
