import { InteractionMode, Tree } from "react-complex-tree"
import { StaticTreeDataProvider, UncontrolledTreeEnvironment, TreeItemIndex } from "react-complex-tree"
import { FileTreeProps, TreeItem } from "type"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCirclePlus, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { renderers } from "./renderers"

export default function FileTree({ onFileSelect }: FileTreeProps) {
  const [items, setItems] = useState<Record<string, TreeItem>>({
    root: {
      index: "root",
      isFolder: true,
      children: ["child1", "child2"],
      data: "Root item"
    },
    child1: {
      index: "child1",
      isFolder: false,
      children: [],
      data: "Child item 1",
      content: "// Content of Child item 1\nconsole.log('Hello from Child item 1');"
    },
    child2: {
      index: "child2",
      isFolder: true,
      children: ["child3"],
      data: "Child item 2"
    },
    child3: {
      index: "child3",
      isFolder: false,
      children: [],
      data: "Child item 3",
      content: "// Content of Child item 3\nconsole.log('Hello from Child item 3');"
    }
  })

  const [targetFolderId, setTargetFolderId] = useState<string>("root")

  const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({
    ...item,
    data: newName
  }))

  const handleSelect = (selectedItemIndexes: TreeItemIndex[]) => {
    selectedItemIndexes.forEach(selectedItemIndex => {
      const selectedItem = items[selectedItemIndex] // 선택된 항목의 데이터
      if (selectedItem && !selectedItem.isFolder) {
        // 파일일 때만 처리. content가 존재하는 경우에만 처리
        console.log("Selecting file to open in tab:", selectedItem.data) // 디버깅을 위한 로그
        onFileSelect(selectedItem?.data, selectedItem?.content) // 파일 제목과 내용을 전달하여 탭 열기
      }
    })
  }

  const injectItem = () => {
    setItems(currentItems => {
      const newItemIndex = `item_${Math.random()}`
      const newItem = {
        index: newItemIndex,
        isFolder: false,
        children: [],
        data: "New Item",
        content: "" // 빈 문자열로 content 추가
      }

      return {
        ...currentItems,
        [newItemIndex]: newItem,
        [targetFolderId]: {
          ...currentItems[targetFolderId],
          children: [...currentItems[targetFolderId].children, newItemIndex]
        }
      }
    })

    // 데이터 공급자에 변경 사항을 알림
    dataProvider.onDidChangeTreeDataEmitter.emit([targetFolderId])
  }

  const injectFolder = () => {
    setItems(currentItems => {
      const newFolderIndex = `folder_${Math.random()}`
      const newFolder = {
        index: newFolderIndex,
        isFolder: true,
        children: [],
        data: "New Folder"
      }

      return {
        ...currentItems,
        [newFolderIndex]: newFolder,
        [targetFolderId]: {
          ...currentItems[targetFolderId],
          children: [...currentItems[targetFolderId].children, newFolderIndex]
        }
      }
    })

    // 데이터 공급자에 변경 사항을 알림
    dataProvider.onDidChangeTreeDataEmitter.emit([targetFolderId])
  }

  return (
    <UncontrolledTreeEnvironment
      dataProvider={dataProvider}
      getItemTitle={item => item.data}
      viewState={{}}
      canDragAndDrop={true}
      canDropOnFolder={true}
      canReorderItems={true}
      defaultInteractionMode={InteractionMode.ClickItemToExpand}
      onRenameItem={(item, name) => alert(`${item.data} renamed to ${name}`)}
      {...renderers}
      onSelectItems={handleSelect}
    >
      <div className="flex justify-between space-x-2 mb-7 items-center mt-3">
        <h3 className="text-2xl text-white">Project</h3>
        <div>
          <button type="button" onClick={injectItem} className="icon-button p-2 text-white hover:text-lime-400 mr-3">
            <FontAwesomeIcon icon={faFileCirclePlus} />
          </button>
          <button type="button" onClick={injectFolder} className="icon-button p-2 text-white hover:text-lime-400">
            <FontAwesomeIcon icon={faFolderPlus} />
          </button>
        </div>
      </div>
      <div
        style={{
          color: "#e3e3e3",
          borderTop: "1px solid #e3e3e3",
          paddingTop: "30px"
        }}
      >
        <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
      </div>
    </UncontrolledTreeEnvironment>
  )
}
