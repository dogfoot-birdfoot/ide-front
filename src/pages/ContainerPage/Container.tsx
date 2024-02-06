import React from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import ContainerForm from "../../components/form/ContainerForm"
import Header from "../../components/header/Header"
import { Link } from "react-router-dom"

const containers = [
  {
    id: 1,
    name: "Java 프로젝트",
    number: 1,
    language: "Java",
    lastModified: "2024-02-05"
  },
  {
    id: 2,
    name: "JavaScript 앱",
    number: 2,
    language: "JavaScript",
    lastModified: "2024-02-05"
  },
  {
    id: 3,
    name: "Python 스크립트",
    number: 3,
    language: "Python",
    lastModified: "2024-02-05"
  }
]

const ContainerPage = () => {
  const addNewContainer = () => {
    console.log("Adding new container")
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userName="홍길동" userEmail="hong@example.com" containers={containers} />
      <div className="flex-grow p-4">
        <Header onAddContainer={addNewContainer} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {containers.map(container => (
            <ContainerForm
              key={container.id}
              number={container.number}
              language={container.language}
              lastModified={container.lastModified}
              name={container.name}
            />
          ))}
        </div>
        <Link to={"/ide"}>IDE 페이지 접근하기</Link>
      </div>
    </div>
  )
}

export default ContainerPage
