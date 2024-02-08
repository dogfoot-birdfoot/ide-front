import { InteractionMode, Tree, TreeItemIndex, TreeItem, CustomTreeItem } from "react-complex-tree"
import { StaticTreeDataProvider, UncontrolledTreeEnvironment } from "react-complex-tree"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCirclePlus, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FileItem, FileTreeProps } from "type"
import { renderers } from "./renderers"

const FileTree: React.FC<FileTreeProps> = ({ onFileSelect }) => {
  const [name, setName] = useState<string>("")
  const [showInputForItem, setShowInputForItem] = useState<boolean>(false)
  const [showInputForFolder, setShowInputForFolder] = useState<boolean>(false)
  const [fileItems, setFileItems] = useState<FileItem[]>([])

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await axios.get<FileItem[]>("http://localhost:3001/files")
      console.log("전체 데이터 페치해옴", response.data)
      setFileItems(response.data)
    } catch (error) {
      console.error("전체 데이터 페치못해옴", error)
    }
  }

  const injectItem = () => {
    setShowInputForItem(true)
  }

  const injectFolder = () => {
    setShowInputForFolder(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    if (e.key === "Enter") {
      callback()
    }
  }

  const injectName = () => {
    axios
      .post("http://localhost:3001/files", {
        name: name,
        isFolder: false,
        children: [],
        data: "New Item",
        content: ""
      })
      .then(response => {
        fetchFiles()
        console.log("파일 추가하고 전체 목록 받아왔어용")
        setShowInputForItem(false)
        setName("")
      })
      .catch(error => {
        console.error("파일 추가 중 오류 발생:", error)
      })
  }

  const injectFolderName = () => {
    axios
      .post("http://localhost:3001/files", {
        name: name,
        isFolder: true,
        children: [],
        data: "New Folder",
        content: ""
      })
      .then(response => {
        fetchFiles()
        console.log("폴더 추가하고 전체 목록 받아왔어용")
        setShowInputForFolder(false)
        setName("")
      })
      .catch(error => {
        console.error("폴더 추가 중 오류 발생:", error)
      })
  }

  const handleSelect = (selectedItemNames: TreeItemIndex[], treeId: string) => {
    selectedItemNames.forEach(selectedItemName => {
      if (typeof selectedItemName === "string") {
        const selectedItem = Object.values(items).filter(item => item.name === selectedItemName)[0] // Object.values()를 사용하여 배열로 변환
        if (selectedItem && !selectedItem.isFolder) {
          console.log("Selecting file to open in tab:", selectedItem.data)
          onFileSelect(selectedItem.data, selectedItem.content || "")
        }
      }
    })
  }

  const items: Record<TreeItemIndex, CustomTreeItem<string>> = {}

  fileItems.forEach(item => {
    items[item.name] = {
      data: item.data,
      children: item.children,
      isFolder: item.isFolder,
      name: item.name,
      index: item.name
    }
  })

  const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({
    ...item,
    data: newName
  }))

  return (
    <UncontrolledTreeEnvironment
      dataProvider={dataProvider}
      getItemTitle={item => item.data}
      viewState={{}}
      canDragAndDrop={true}
      canDropOnFolder={true}
      canReorderItems={true}
      defaultInteractionMode={InteractionMode.ClickItemToExpand}
      onRenameItem={(item, newName) => alert(`${item.data} renamed to ${newName}`)}
      onSelectItems={handleSelect}
      {...renderers}
    >
      <div className="flex justify-between space-x-2 mb-7 items-center mt-3">
        <h3 className="text-2xl text-white">Project</h3>

        <button type="button" onClick={injectItem} className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
        <button
          type="button"
          onClick={injectFolder}
          className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
        >
          <FontAwesomeIcon icon={faFolderPlus} />
        </button>

        {showInputForItem && (
          <div>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              onKeyPress={e => handleInputKeyPress(e, injectName)} // 엔터를 누르면 injectName 함수 호출
              placeholder="이름 입력 후 엔터를 누르세요."
              className="p-2 border rounded-md"
            />
          </div>
        )}

        {showInputForFolder && (
          <div>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              onKeyPress={e => handleInputKeyPress(e, injectFolderName)} // 엔터를 누르면 injectFolderName 함수 호출
              placeholder="이름 입력 후 엔터를 누르세요."
              className="p-2 border rounded-md"
            />
          </div>
        )}
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

export default FileTree
