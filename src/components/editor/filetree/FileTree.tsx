import { InteractionMode, Tree, TreeItemIndex } from "react-complex-tree"
import { StaticTreeDataProvider, UncontrolledTreeEnvironment } from "react-complex-tree"
import { FileTreeProps } from "type"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCirclePlus, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { renderers } from "./renderers"
import data from "data.json"
import { DataStructure } from "type"

export default function FileTree({ onFileSelect }: FileTreeProps) {
  const typedData: DataStructure = data
  const [items, setItems] = useState(data.files)
  const [targetFolderId, setTargetFolderId] = useState<string>("root")
  const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({
    ...item,
    data: newName
  }))

  const handleSelect = (selectedItemIndexes: TreeItemIndex[], treeId: string) => {
    selectedItemIndexes.forEach(selectedItemIndex => {
      if (typeof selectedItemIndex === "string") {
        // 타입 가드를 사용하여 string인지 확인
        const selectedItem = items[selectedItemIndex]
        if (selectedItem && !selectedItem.isFolder) {
          console.log("Selecting file to open in tab:", selectedItem.data)
          onFileSelect(selectedItem.data, selectedItem.content || "")
        }
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
        content: ""
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
