import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"
interface NameModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  parentId: string
  isFolder: boolean
  dataProvider: {
    injectItem: (parentId: string, itemName: string) => void
    injectFolder: (parentId: string, itemName: string) => void
  }
}
export default function NameModal({ isOpen, setIsOpen, parentId, dataProvider, isFolder }: NameModalProps) {
  const [itemName, setItemName] = useState("")

  const inputRef = useRef<HTMLInputElement>(null) // 입력 필드 참조에 HTMLInputElement 타입 지정

  function closeModal() {
    setIsOpen(false)
  }

  const injectItemOrFolder = () => {
    const trimmedName = itemName.trim() || "제목없음"
    if (isFolder) {
      dataProvider.injectFolder(parentId, trimmedName)
    } else {
      dataProvider.injectItem(parentId, trimmedName)
    }
    closeModal() // 모달 닫기
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal} initialFocus={inputRef}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                onClick={e => e.stopPropagation()}
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  파일 또는 폴더명을 입력하세요.
                </Dialog.Title>
                <input
                  type="text"
                  className="mt-2 w-full border border-gray-300 p-2"
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  placeholder="파일명 또는 폴더명"
                  ref={inputRef}
                />
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-lime-100 px-4 py-2 text-sm font-medium text-lime-900 hover:bg-lime-200 focus:outline-none"
                    onClick={injectItemOrFolder}
                  >
                    생성하기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
