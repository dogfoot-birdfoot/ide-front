// import { Dialog, Transition } from "@headlessui/react"
// import { Fragment, useState } from "react"

// export default function NameModal() {
//   const [isOpen, setIsOpen] = useState(true)

//   function closeModal() {
//     setIsOpen(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center">
//         <button
//           type="button"
//           onClick={openModal}
//           className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
//         >
//           Open dialog
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                     Payment successful
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       Your payment has been successfully submitted. We’ve sent you an email with all of the details of
//                       your order.
//                     </p>
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       onClick={closeModal}
//                     >
//                       Got it, thanks!
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
interface NameModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  parentId: string
  dataProvider: {
    injectItem: (parentId: string, itemName: string) => void
  }
}
export default function NameModal({ isOpen, setIsOpen, parentId, dataProvider }: NameModalProps) {
  const [itemName, setItemName] = useState("")

  function closeModal() {
    setIsOpen(false)
  }

  const injectItem = () => {
    if (itemName.trim() === "") {
      // 아이템 이름이 비어있으면 기본값 설정
      setItemName("제목없음")
    }
    if (dataProvider) {
      dataProvider.injectItem(parentId, itemName.trim() || "제목없음")
    }
    closeModal() // 모달 닫기
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  파일 또는 폴더명을 입력하세요.
                </Dialog.Title>
                <input
                  type="text"
                  className="mt-2 w-full border border-gray-300 p-2"
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  placeholder="파일명 또는 폴더명"
                />
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-lime-100 px-4 py-2 text-sm font-medium text-lime-900 hover:bg-lime-200 focus:outline-none"
                    onClick={injectItem}
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
