// Header 컴포넌트 (Header.tsx)
import React from "react"

interface HeaderProps {
  onAddContainerClick: () => void
}
const Header: React.FC<HeaderProps> = ({ onAddContainerClick }) => {
  return (
    <div className="flex justify-between items-center mb-10 mt-5 bg-white">
      <div className="w-1/2">
        <h1 className="text-lg font-bold">모든 컨테이너</h1>
        <input
          className="mt-6 p-2 border border-slate-400 rounded w-3/4"
          type="text"
          placeholder="컨테이너 이름 검색"
        />
      </div>

      <button
        className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
        onClick={onAddContainerClick}
      >
        + 새 컨테이너
      </button>
    </div>
  )
}

export default Header
