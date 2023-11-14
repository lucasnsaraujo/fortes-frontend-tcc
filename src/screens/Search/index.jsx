import Navbar from "../../components/Navbar";
import { Table } from "../../components/UsersTable";

export default function Search() {
  const users = [
    {
      id: 1,
      name: "João da Silva",
      skills: ["Excel", "PowerPoint", "Power BI"],
    },
    {
      id: 2,
      name: "Maria Santos",
      skills: ["JavaScript", "React", "Node.js"],
    },
    {
      id: 3,
      name: "Pedro Alves",
      skills: ["HTML", "CSS", "SASS"],
    },
    {
      id: 4,
      name: "Ana Oliveira",
      skills: ["Python", "Django", "Pandas"],
    },
    {
      id: 5,
      name: "Carlos Pereira",
      skills: ["Java", "Spring Boot", "Hibernate"],
    },
    {
      id: 6,
      name: "Julia Rodrigues",
      skills: ["C#", ".NET", "SQL Server"],
    },
    {
      id: 7,
      name: "Ricardo Costa",
      skills: ["Ruby", "Ruby on Rails", "PostgreSQL"],
    },
    {
      id: 8,
      name: "Camila Fernandes",
      skills: ["PHP", "Laravel", "MySQL"],
    },
    {
      id: 9,
      name: "Miguel Sousa",
      skills: ["Swift", "iOS Development", "Core Data"],
    },
    {
      id: 10,
      name: "Larissa Lima",
      skills: ["Go", "Docker", "Kubernetes"],
    },
    {
      id: 11,
      name: "Lucas Santos",
      skills: ["Vue.js", "Vuex", "Vuetify"],
    },
    {
      id: 12,
      name: "Isabela Fernandes",
      skills: ["Ruby", "React Native", "Firebase"],
    },
    {
      id: 13,
      name: "Gustavo Silva",
      skills: ["Angular", "TypeScript", "RxJS"],
    },
    {
      id: 14,
      name: "Laura Oliveira",
      skills: ["C++", "OpenGL", "Unity"],
    },
    {
      id: 15,
      name: "Daniel Pereira",
      skills: ["Scala", "Akka", "Play Framework"],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl my-0 mx-auto py-8 px-4">
        <h1 className="mb-4 text-2xl font-semibold">
          Buscar colaborador por habilidade
        </h1>
        <Table users={users} />
      </div>
    </>
  );
}
