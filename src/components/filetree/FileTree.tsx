import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Tree, TreeDataProvider, UncontrolledTreeEnvironment } from "react-complex-tree"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt, faFileCirclePlus, faFolder, faFolderOpen, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { useActiveFile } from "../../context/ActiveFileContext"
type FileStructureChangeCallback = (newFileStructure: any) => void
class CustomDataProviderImplementation implements TreeDataProvider<any> {
  data: any
  treeChangeListeners: ((changedItemIds: any) => void)[]
  onFileStructureChange: FileStructureChangeCallback | null = null
  constructor(initialData: any) {
    this.data = initialData
    this.treeChangeListeners = []
    this.onFileStructureChange = null
  }

  async getTreeItem(itemId: string | number) {
    return this.data[itemId] || { children: [] }
  }

  async onChangeItemChildren(itemId: string | number, newChildren: any) {
    if (this.data[itemId]) {
      this.data[itemId].children = newChildren
      this.treeChangeListeners.forEach(listener => listener([itemId]))
    } else {
      console.error(`아이템 ID '${itemId}'에 해당하는 아이템이 존재하지 않습니다.`)
    }
  }

  onDidChangeTreeData(listener: (changedItemIds: any) => void) {
    this.treeChangeListeners.push(listener)
    return {
      dispose: () => this.treeChangeListeners.splice(this.treeChangeListeners.indexOf(listener), 1)
    }
  }

  async onRenameItem(item: { index: string | number }, name: any) {
    if (this.data[item.index]) {
      this.data[item.index].data = name
    }
  }

  injectItem(parentId: string | number, name: string, isFolder = false) {
    const rand = `${Math.random()}`
    const parentItem = this.data[parentId]
    const newItemDepth = parentItem ? parentItem.depth + 1 : 0

    this.data[rand] = {
      data: name,
      index: rand,
      children: [],
      isFolder: isFolder,
      depth: newItemDepth,
      content: ""
    }

    if (parentItem) {
      parentItem.children.push(rand)
    } else {
      this.data.root = this.data.root || { children: [], depth: 0 }
      this.data.root.children.push(rand)
    }

    this.treeChangeListeners.forEach(listener => listener([parentId]))

    if (this.onFileStructureChange) {
      this.onFileStructureChange(this.data)
    }

    // Send data to localhost:3001
    axios
      .post("http://localhost:3001/files", this.data)
      .then(response => {
        console.log("Data sent successfully:", response.data)
      })
      .catch(error => {
        console.error("Error sending data:", error)
      })
  }

  injectFolder(parentId: string, name: string) {
    this.injectItem(parentId, name, true)
  }

  setOnFileStructureChange(callback: null) {
    this.onFileStructureChange = callback
  }
}

function FileTree() {
  const [initialData, setInitialData] = useState<any>({ root: { children: [], depth: 0 } })
  const { setActiveFile, setActiveFileContent, addTab, tabs } = useActiveFile()

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

  const dataProvider = useMemo(() => new CustomDataProviderImplementation(initialData), [initialData])

  const injectItem = () => {
    const parentId = "root" // 예시로 'root'를 사용, 실제 사용 시 적절한 부모 ID 사용
    dataProvider && dataProvider.injectItem(parentId, "New Item")
  }

  const injectFolder = () => {
    const parentId = "root" // 예시로 'root'를 사용, 실제 사용 시 적절한 부모 ID 사용
    dataProvider && dataProvider.injectFolder(parentId, "New Folder")
  }

  return (
    <div className="ml-5 mt-5 text-white">
      <div className="flex items-center mb-4 justify-between  bg-slate-600">
        <h3 className="text-lg font-semibold">Project</h3>
        <div>
          <button onClick={injectItem} className="ml-2 p-1 ">
            <FontAwesomeIcon icon={faFileCirclePlus} /> {/* 파일 추가 아이콘 */}
          </button>
          <button onClick={injectFolder} className="ml-2 p-1">
            <FontAwesomeIcon icon={faFolderPlus} /> {/* 폴더 추가 아이콘 */}
          </button>
        </div>
      </div>

      <UncontrolledTreeEnvironment
        canDragAndDrop={true}
        canDropOnFolder={true}
        canReorderItems={true}
        onRenameItem={async (treeItem, newName) => {
          // 'treeItem' 객체에서 아이템의 ID를 추출
          const itemId = treeItem.data // 'id'는 예시이며 실제 속성명은 확인이 필요합니다.

          // 아이템 ID와 새로운 이름을 사용하여 이름 변경 로직 수행
          await dataProvider.onRenameItem({ index: itemId }, newName)
        }}
        dataProvider={dataProvider}
        getItemTitle={item => item.data}
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
                  setActiveFile(item.data) // 활성 파일 식별자 설정
                  setActiveFileContent(item.content) // 활성 파일 내용 설정
                } else {
                  // 새 탭을 추가하고 활성화합니다.
                  addTab({ data: item.data, content: item.content })
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
              {context.isExpanded ? <FontAwesomeIcon icon={faFolderOpen} /> : <FontAwesomeIcon icon={faFolder} />}
            </span>
          ) : null
        }
        renderTreeContainer={({ children, containerProps }) => (
          <div {...containerProps} className="p-2  border-gray-300 rounded-lg">
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
              marginLeft: `${depth * 20}px`,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <span
              {...context.itemContainerWithoutChildrenProps}
              {...context.interactiveElementProps}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {item.isFolder ? context.isExpanded ? "" : "" : <FontAwesomeIcon icon={faFileAlt} />}
              {arrow}
              {title}
            </span>
            {children}
          </li>
        )}
      >
        <Tree treeId="tree-1" rootItem="root" treeLabel="File System" />
      </UncontrolledTreeEnvironment>
    </div>
  )
}

export default FileTree
