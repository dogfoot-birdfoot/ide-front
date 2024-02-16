import React from "react"
import { ContextMenuProps } from "type"
import { toast } from "react-toastify"

const ContextMenu: React.FC<ContextMenuProps> = ({ onDelete, x, y }) => {
  const confirmDelete = () => {
    // 사용자가 확인을 클릭했을 때 실행될 로직
    onDelete()
  }

  const handleDeleteClick = () => {
    toast(
      ({ closeToast }) => (
        <div className="max-w-md w-full bg-white rounded-lg pointer-events-auto flex flex-col items-center">
          <div className="w-full p-4 text-center">
            <p className="text-sm font-medium text-gray-900">삭제하시겠습니까?</p>
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={() => {
                  confirmDelete()
                  closeToast()
                }}
                className="text-sm bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
              >
                확인
              </button>
              <button
                onClick={closeToast}
                className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: true, // 토스트 외부를 클릭하면 토스트가 닫힙니다.
        draggable: false,
        closeButton: false // 필요에 따라 닫기 버튼을 비활성화할 수 있습니다.
      }
    )
  }

  return (
    <>
      <ul
        className="absolute z-50 bg-lime-500 shadow-lg rounded-md overflow-hidden"
        style={{ top: `${y}px`, left: `${x}px`, minWidth: "150px" }}
      >
        <li
          className="p-2 hover:bg-lime-700 hover:text-white cursor-pointer transition-colors duration-150 ease-in-out"
          onClick={handleDeleteClick}
        >
          Delete
        </li>
      </ul>
    </>
  )
}

export default ContextMenu
