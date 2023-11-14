import Navbar from "../../components/Navbar";
import { Table } from "../../components/UsersTable";

export default function Search() {
  const users = [
    {
      id: 1,
      name: "João",
      skills: ["Excel", "PowerPoint", "Power BI"],
    },
    {
      id: 2,
      name: "Maria",
      skills: ["JavaScript", "React", "Node.js"],
    },
    {
      id: 3,
      name: "Pedro",
      skills: ["HTML", "CSS", "SASS"],
    },
    {
      id: 4,
      name: "Ana",
      skills: ["Python", "Django", "Pandas"],
    },
    {
      id: 5,
      name: "Carlos",
      skills: ["Java", "Spring Boot", "Hibernate"],
    },
    {
      id: 6,
      name: "Julia",
      skills: ["C#", ".NET", "SQL Server"],
    },
    {
      id: 7,
      name: "Ricardo",
      skills: ["Ruby", "Ruby on Rails", "PostgreSQL"],
    },
    {
      id: 8,
      name: "Camila",
      skills: ["PHP", "Laravel", "MySQL"],
    },
    {
      id: 9,
      name: "Miguel",
      skills: ["Swift", "iOS Development", "Core Data"],
    },
    {
      id: 10,
      name: "Larissa",
      skills: ["Go", "Docker", "Kubernetes"],
    },
    {
      id: 11,
      name: "Lucas",
      skills: ["Vue.js", "Vuex", "Vuetify"],
    },
    {
      id: 12,
      name: "Isabela",
      skills: ["Ruby", "React Native", "Firebase"],
    },
    {
      id: 13,
      name: "Gustavo",
      skills: ["Angular", "TypeScript", "RxJS"],
    },
    {
      id: 14,
      name: "Laura",
      skills: ["C++", "OpenGL", "Unity"],
    },
    {
      id: 15,
      name: "Daniel",
      skills: ["Scala", "Akka", "Play Framework"],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl my-0 mx-auto py-8">
        <Table users={users} />
      </div>
    </>
  );
}
