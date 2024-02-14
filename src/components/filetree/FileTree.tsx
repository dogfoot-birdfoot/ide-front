import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Tree, TreeDataProvider, UncontrolledTreeEnvironment } from "react-complex-tree"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileAlt, faFileCirclePlus, faFolder, faFolderOpen, faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { useActiveFile } from "../../context/ActiveFileContext"
import { FileStructureChangeCallback } from "type"

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

  // async onRenameItem(item: { index: string | number }, newName: string) {
  //   const targetItem = this.data[item.index]
  //   if (targetItem) {
  //     // 파일 이름 변경
  //     targetItem.data = newName

  //     // 부모 폴더 찾기
  //     const parentItem = this.data[targetItem.parentId]
  //     if (parentItem && parentItem.children.includes(item.index)) {
  //       // 부모 폴더의 children 배열 업데이트 로직 추가
  //       // 이 예시에서는 파일의 index(ID)가 변경되지 않으므로, 부모 폴더의 children 배열을 업데이트할 필요가 없습니다.
  //       // 만약 파일의 ID가 변경되는 경우라면, 여기서 부모 폴더의 children 배열에서 이전 ID를 찾아 새 ID로 교체해야 합니다.
  //     }

  //     try {
  //       const response = await axios.put(`http://localhost:3001/files/${item.index}`, {
  //         ...targetItem // 이름 변경
  //       })
  //       console.log("서버 응답:", response.data)
  //     } catch (error) {
  //       console.error("이름 수정 중 오류 발생:", error)
  //     }
  //   } else {
  //     console.error(`아이템 ID '${item.index}'에 해당하는 아이템이 존재하지 않습니다.`)
  //   }
  // }

  async removeItem(itemId: string | number) {
    console.log(`Attempting to remove item with ID: ${itemId}`) // 삭제 시도되는 아이템의 ID 출력

    const itemToRemove = this.data[itemId]
    if (!itemToRemove) {
      console.error(`아이템 ID '${itemId}'에 해당하는 아이템이 존재하지 않습니다.`)
      return
    }

    if (!itemToRemove.isFolder) {
      // 아이템이 파일인 경우, 부모의 children 배열에서 해당 파일 제거
      const parent = this.data[itemToRemove.parentId]
      if (parent) {
        parent.children = parent.children.filter((childId: string | number) => childId !== itemId)
        this.treeChangeListeners.forEach(listener => listener([itemToRemove.parentId]))
      }
      delete this.data[itemId] // 파일 삭제
    } else {
      // 아이템이 폴더인 경우, 폴더와 그 안의 모든 자식 아이템 재귀적으로 삭제
      const deleteFolderAndChildren = (id: string | number) => {
        const folder = this.data[id]
        if (!folder) return

        if (folder.children && folder.children.length > 0) {
          folder.children.forEach((childId: string | number) => deleteFolderAndChildren(childId))
        }

        delete this.data[id]
      }

      deleteFolderAndChildren(itemId) // 폴더 및 그 안의 자식들 삭제

      // 부모 폴더의 children 배열에서 현재 폴더 제거
      const parent = this.data[itemToRemove.parentId]
      if (parent) {
        parent.children = parent.children.filter((childId: string | number) => childId !== itemId)
        this.treeChangeListeners.forEach(listener => listener([itemToRemove.parentId]))
      }
    }

    if (this.onFileStructureChange) {
      this.onFileStructureChange(this.data) // 변경 사항 콜백 호출
    }

    // 변경된 데이터를 서버로 전송
    axios
      .post("http://localhost:3001/files", this.data)
      .then(response => {
        console.log("Data sent successfully:", response.data)
      })
      .catch(error => {
        console.error("Error sending data:", error)
      })
  }

  injectItem(parentId: string | number, name: string, isFolder = false) {
    const rand = `${Math.random()}`
    const parentItem = this.data[parentId]
    const newItemDepth = parentItem ? parentItem.depth + 1 : 0

    this.data[rand] = {
      data: name,
      index: rand,
      parentId: parentId,
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
            onContextMenu={e => {
              e.preventDefault() // 우클릭 메뉴 표시를 막습니다.
              e.stopPropagation() // 이벤트 버블링을 막습니다.
              dataProvider.removeItem(item.index) // 아이템을 삭제합니다.
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
