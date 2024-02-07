import Editor from "@/components/editor/Editor"
import FileTree from "@/components/editor/filetree/FileTree"
import React from "react"

const IDEPage = () => {
  return (
    <div className="flex bg-customGray">
      <div className="w-1/5 bg-customGray p-4 border-r ">
        <FileTree />
      </div>
      <div className="w-3/4 p-4">
        <Editor />
      </div>
    </div>
  )
}

export default IDEPage
