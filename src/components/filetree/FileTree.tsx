import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Tree, UncontrolledTreeEnvironment } from "react-complex-tree"
import { ContextMenuState, fileTreeProps } from "type"

/* Components */
import ContextMenu from "@/components/filetree/ContextMenu"
import CustomDataProvider from "@/components/filetree/CustomDataProvider"
import NameModal from "@/components/modal/NameModal"
import { getFileIconPath } from "@/components/renderingIcons/getFileIconPath"
import { useFileStructure } from "@/context/FileStructureContext"
import { useActiveFile } from "@/context/ActiveFileContext"

/* UI */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCirclePlus, faFloppyDisk, faFolder, faFolderOpen, faFolderPlus } from "@fortawesome/free-solid-svg-icons"

function FileTree({ initialData, setInitialData }: fileTreeProps) {
  const { setActiveFile, setActiveFileContent, addTab, tabs, activeFile, activeFileContent, removeTab } =
    useActiveFile()
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFolder, setIsFolder] = useState(false)

  const { fileStructure } = useFileStructure()
  const dataProvider = useMemo(() => new CustomDataProvider(initialData), [initialData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/files")
        setInitialData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  useEffect(() => {
    // 바깥쪽 클릭 시 컨텍스트 메뉴 닫기
    document.addEventListener("click", handleCloseContextMenu)
    return () => {
      document.removeEventListener("click", handleCloseContextMenu)
    }
  }, [])

  const handleOpenModal = (isFolder: boolean) => {
    setIsFolder(isFolder)
    setIsModalOpen(true)
  }

  const saveFileContent = async () => {
    if (!fileStructure) {
      console.error("File structure is undefined.")
      return
    }

    // activeFile에 해당하는 객체를 찾습니다.
    let fileToUpdate = null
    let fileKeyToUpdate = null
    for (const key in fileStructure) {
      if (fileStructure[key].data === activeFile) {
        fileToUpdate = fileStructure[key]
        fileKeyToUpdate = key
        break
      }
    }

    // 찾은 객체의 content 속성을 업데이트합니다.
    if (fileToUpdate && fileKeyToUpdate) {
      const updatedFileStructure = {
        ...fileStructure,
        [fileKeyToUpdate]: {
          ...fileToUpdate,
          content: activeFileContent
        }
      }

      try {
        await axios.post("http://localhost:3001/files", updatedFileStructure)
        console.log("File content updated successfully.")
        const response = await axios.get("http://localhost:3001/files")
        setInitialData(response.data)
      } catch (error) {
        console.error("Error updating file content:", error)
      }
    } else {
      console.error("Active file not found in file structure.")
    }
  }

  return (
    <div className="ml-5 mt-5 text-white" onClick={handleCloseContextMenu}>
      <div className="flex items-center mb-4 justify-between  bg-slate-600">
        <h3 className="text-lg font-semibold">Project</h3>
        <div>
          <>
            <button onClick={() => handleOpenModal(false)} className="ml-2 p-1 ">
              <FontAwesomeIcon icon={faFileCirclePlus} /> {/* 파일 추가 아이콘 */}
            </button>
            <button
              onClick={() => {
                handleOpenModal(true)
              }}
              className="ml-2 p-1"
            >
              <FontAwesomeIcon icon={faFolderPlus} />
            </button>
            {isModalOpen && (
              <NameModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                parentId="root"
                dataProvider={dataProvider}
                isFolder={isFolder}
              />
            )}
          </>
          <button onClick={saveFileContent} className="ml-2 p-1 ">
            <FontAwesomeIcon icon={faFloppyDisk} /> {/* 파일 저장 아이콘 */}
          </button>
        </div>
      </div>

      <UncontrolledTreeEnvironment
        canDragAndDrop={true}
        canDropOnFolder={true}
        canReorderItems={true}
        dataProvider={dataProvider}
        getItemTitle={item => item.data}
        // onRenameItem={(item, newName) => dataProvider.onRenameItem(item, newName)}
        onSelectItems={selectedItemIds => {
          console.log("Selected item IDs:", selectedItemIds)

          selectedItemIds.forEach(itemId => {
            dataProvider.getTreeItem(itemId).then(item => {
              console.log("Item data:", item)
              if (!item.isFolder) {
                // 이미 열린 탭이 있는지 확인합니다.
                const existingTab = tabs.find(tab => tab.data === item.data)

                // 이미 열린 탭이 있다면, 해당 탭의 내용을 활성화만 합니다.
                if (existingTab) {
                  setActiveFile(existingTab.data) // 활성 파일 식별자 설정
                  setActiveFileContent(existingTab.content) // 활성 파일 내용 설정
                } else {
                  // 새 탭을 추가하고 활성화합니다.
                  addTab({ data: item.data, content: item.content, id: item.id, index: item.index, isModified: false })
                  setActiveFile(item.data)
                  setActiveFileContent(item.content)
                }
              }
            })
          })
        }}
        viewState={{ "tree-1": { expandedItems: [] } }}
        renderItemTitle={({ title }) => <span className="ml-3">{title}</span>}
        renderItemArrow={({ item, context }) =>
          item.isFolder ? (
            <span {...context.arrowProps}>
              {context.isExpanded ? (
                <FontAwesomeIcon icon={faFolderOpen} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faFolder} size="lg" />
              )}
            </span>
          ) : null
        }
        renderTreeContainer={({ children, containerProps }) => (
          <div {...containerProps} className="p-1 border-gray-300 rounded-lg">
            {children}
          </div>
        )}
        renderItemsContainer={({ children, containerProps }) => (
          <ul {...containerProps} className="list-none pl-1">
            {children}
          </ul>
        )}
        renderItem={({ title, arrow, depth, context, children, item }) => (
          <li
            {...context.itemContainerWithChildrenProps}
            style={{
              marginLeft: `${depth * 3}px`,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
            onContextMenu={e => {
              e.preventDefault() // 우클릭 메뉴 표시를 막습니다.
              e.stopPropagation() // 이벤트 버블링을 막습니다.
              setContextMenu({
                x: e.pageX,
                y: e.pageY,
                itemIndex: item.index
              }) // 컨텍스트 메뉴 설정
            }}
          >
            <span
              {...context.itemContainerWithoutChildrenProps}
              {...context.interactiveElementProps}
              style={{ whiteSpace: "nowrap", cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {!item.isFolder && (
                <img src={getFileIconPath(item.data)} alt="File Icon" style={{ width: "20px", height: "20px" }} />
              )}

              {arrow}
              {title}
            </span>
            {children}
          </li>
        )}
      >
        <Tree treeId="tree-1" rootItem="root" treeLabel="File System" />
      </UncontrolledTreeEnvironment>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={() => {
            dataProvider.removeItem(contextMenu.itemIndex)
            // 탭 목록에서 contextMenu.itemIndex에 해당하는 탭 데이터 찾기
            const tabToRemove = tabs.find(tab => tab.index === contextMenu.itemIndex) // 예시로 id를 사용합니다. 실제 구현은 달라질 수 있습니다.

            // 해당 탭 데이터가 있으면 removeTab 호출
            if (tabToRemove) {
              removeTab(tabToRemove.data) // removeTab은 탭 데이터를 인수로 받습니다.
            }

            setContextMenu(null) // 컨텍스트 메뉴 숨기기
          }}
        />
      )}
    </div>
  )
}

export default FileTree
