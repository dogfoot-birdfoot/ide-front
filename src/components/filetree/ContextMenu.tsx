import React from "react"
import { ContextMenuProps } from "type"

const ContextMenu: React.FC<ContextMenuProps> = ({ onDelete, x, y }) => {
  return (
    <ul
      className="absolute z-50 bg-lime-500 shadow-lg rounded-md overflow-hidden"
      style={{ top: `${y}px`, left: `${x}px`, minWidth: "150px" }}
    >
      <li
        className="p-2 hover:bg-lime-700 hover:text-white cursor-pointer transition-colors duration-150 ease-in-out"
        onClick={onDelete}
      >
        Delete
      </li>
    </ul>
  )
}

export default ContextMenu
