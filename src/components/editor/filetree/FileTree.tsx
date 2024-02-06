import { InteractionMode } from "react-complex-tree"
import { StaticTreeDataProvider, Tree, UncontrolledTreeEnvironment } from "react-complex-tree"
import { TreeItem } from "../../../type"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCirclePlus, faFolderPlus } from "@fortawesome/free-solid-svg-icons" // 필요한 아이콘을 가져옵니다.
import { useState } from "react"
import { renderers } from "./renderers"
import React from "react"

export default function FileTree() {
  const [items, setItems] = useState<Record<string, TreeItem>>({
    root: {
      index: "root",
      isFolder: true,
      children: ["child1", "child2"],
      data: "Root item"
    },
    child1: {
      index: "child1",
      children: [],
      data: "Child item 1"
    },
    child2: {
      index: "child2",
      isFolder: true,
      children: ["child3"],
      data: "Child item 2"
    },
    child3: {
      index: "child3",
      children: [],
      data: "Child item 3"
    }
  })

  // targetFolderId 상태 추가 및 초기값 설정
  const [targetFolderId, setTargetFolderId] = useState<string>("root")

  const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({
    ...item,
    data: newName
  }))

  const injectItem = () => {
    const newItemIndex = `item_${Math.random()}`
    const newItem = {
      index: newItemIndex,
      children: [],
      data: "New Item"
    }

    // 선택된 폴더에 새 아이템을 추가
    const updatedItems = {
      ...items,
      [newItemIndex]: newItem,
      [targetFolderId]: {
        ...items[targetFolderId],
        children: [...items[targetFolderId].children, newItemIndex]
      }
    }

    // 데이터 공급자에 변경 사항을 알림
    dataProvider.onDidChangeTreeDataEmitter.emit([targetFolderId])

    // items 상태 업데이트
    setItems(updatedItems)
  }

  const injectFolder = () => {
    const newFolderIndex = `folder_${Math.random()}`
    const newFolder = {
      index: newFolderIndex,
      isFolder: true,
      children: [],
      data: "New Folder"
    }

    // 선택된 폴더에 새 폴더를 추가
    const updatedItems = {
      ...items,
      [newFolderIndex]: newFolder,
      [targetFolderId]: {
        ...items[targetFolderId],
        children: [...items[targetFolderId].children, newFolderIndex]
      }
    }

    // 데이터 공급자에 변경 사항을 알림
    dataProvider.onDidChangeTreeDataEmitter.emit([targetFolderId])

    // items 상태 업데이트
    setItems(updatedItems)
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
