import React from "react"
import { TreeRenderProps } from "react-complex-tree"
import { Button, Classes, Collapse, Colors, Icon, InputGroup } from "@blueprintjs/core"

const cx = (...classNames: Array<string | undefined | false>) => classNames.filter(cn => !!cn).join(" ")

export const renderers: TreeRenderProps = {
  renderTreeContainer: props => (
    <div className={cx(Classes.TREE)}>
      <ul className={cx(Classes.TREE_ROOT, Classes.TREE_NODE_LIST)} {...props.containerProps}>
        {props.children}
      </ul>
    </div>
  ),

  renderItemsContainer: props => (
    <ul className={cx(Classes.TREE_NODE_LIST)} {...props.containerProps}>
      {props.children}
    </ul>
  ),

  renderItem: props => (
    <li
      className={cx(
        Classes.TREE_NODE,
        (props.context.isSelected || props.context.isDraggingOver) && Classes.TREE_NODE_SELECTED,
        props.context.isDraggingOver && "drag-over" // 'drag-over' 클래스는 드래그 오버 시의 스타일을 정의합니다.
      )}
      style={{
        marginBottom: "8px",
        ...(props.context.isDraggingOver ? { border: "2px dashed #aaa", padding: "4px" } : {}) // 드래그 오버 시 인라인 스타일 변경
      }}
      {...(props.context.itemContainerWithChildrenProps as any)}
    >
      <div
        className={cx(Classes.TREE_NODE_CONTENT, `${Classes.TREE_NODE_CONTENT}-${props.depth}`)}
        style={{ marginLeft: props.depth * 30 }}
        {...(props.context.itemContainerWithoutChildrenProps as any)}
        {...(props.context.interactiveElementProps as any)}
      >
        {/* 아이콘과 타이틀을 가로로 나란히 배치하기 위해 flex를 사용 */}
        <div className="flex items-center ml-1">
          {props.item.isFolder ? props.arrow : <span className={Classes.TREE_NODE_CARET_NONE} />}
          {props.item.data.icon !== undefined ? (
            props.item.data.icon === null ? null : (
              <Icon icon={props.item.data.icon} className={Classes.TREE_NODE_ICON} color="white" />
            )
          ) : (
            (() => {
              const icon = !props.item.isFolder ? "document" : props.context.isExpanded ? "folder-open" : "folder-close"
              return <Icon icon={icon} className={`${Classes.TREE_NODE_ICON} mr-3`} color="white" />
            })()
          )}
          <span className={Classes.TREE_NODE_LABEL}>{props.title}</span>
        </div>
      </div>
      {/* 자식 요소를 위한 컨테이너 */}
      <div
        className={cx(Classes.COLLAPSE)}
        style={
          props.context.isExpanded
            ? {
                height: "auto",
                overflowY: "visible",
                transition: "none 0s ease 0s"
              }
            : {}
        }
      >
        <Collapse isOpen={props.context.isExpanded} transitionDuration={0}>
          {props.children}
        </Collapse>
      </div>
    </li>
  ),

  renderItemArrow: props => (
    <Icon
      color="white"
      icon="chevron-right"
      className={cx(
        Classes.TREE_NODE_CARET,
        props.context.isExpanded ? Classes.TREE_NODE_CARET_OPEN : Classes.TREE_NODE_CARET_CLOSED
      )}
      {...(props.context.arrowProps as any)}
    />
  ),

  renderDragBetweenLine: ({ draggingPosition, lineProps }) => (
    <div
      {...lineProps}
      style={{
        position: "absolute",
        right: "0",
        top:
          draggingPosition.targetType === "between-items" && draggingPosition.linePosition === "top"
            ? "0px"
            : draggingPosition.targetType === "between-items" && draggingPosition.linePosition === "bottom"
              ? "-4px"
              : "-2px",
        left: `${draggingPosition.depth * 23}px`,
        height: "4px",
        backgroundColor: Colors.BLUE3
      }}
    />
  ),

  renderRenameInput: props => (
    <form {...props.formProps} style={{ display: "contents" }}>
      <span className={Classes.TREE_NODE_LABEL}>
        <input {...props.inputProps} ref={props.inputRef} className="rct-tree-item-renaming-input" />
      </span>
      <span className={Classes.TREE_NODE_SECONDARY_LABEL}>
        <Button icon="tick" {...(props.submitButtonProps as any)} type="submit" minimal small />
      </span>
    </form>
  ),

  renderSearchInput: props => {
    const { ref, ...inputProps } = { ...props.inputProps }
    return (
      <div className={cx("rct-tree-search-input-container")}>
        <InputGroup inputRef={ref} {...(inputProps as any)} autoFocus placeholder="Search..." />
      </div>
    )
  },

  renderDepthOffset: 1
}
