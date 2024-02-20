// DeleteNotification.tsx
import React from "react"
import { toast } from "react-toastify"

const DeleteNotification: React.FC<{ onDelete: (id: number) => void; id: number }> = ({ onDelete, id }) => {
  const handleDeleteConfirmation = () => {
    onDelete(id)
    toast.dismiss() // 토스트 닫기
  }

  return (
    <div className="max-w-md w-full bg-white  pointer-events-auto flex flex-col items-center ">
      <div className="w-full p-4 text-center">
        <p className="text-sm font-medium text-gray-900">삭제하시겠습니까?</p>
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={handleDeleteConfirmation}
            className="text-sm bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
          >
            확인
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="text-sm bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteNotification
