import { useState } from "react";
import Navbar from "../../components/Navbar";
import { SkillModal } from "../../components/SkillModal";
import { SkillsTable } from "../../components/SkillsTable";
import { Table } from "../../components/UsersTable";

export default function Admin() {
  const [showSkillModal, setShowSkillModal] = useState(true);
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
  ];

  const skills = [
    { id: 1, nome: "Programação em Python" },
    { id: 2, nome: "Desenvolvimento Web" },
    { id: 3, nome: "Gestão de Projetos" },
    { id: 4, nome: "Marketing Digital" },
    { id: 5, nome: "Design Gráfico" },
    { id: 6, nome: "Análise de Dados" },
    { id: 7, nome: "Redação Criativa" },
    // { id: 8, nome: "Gerenciamento de Redes Sociais" },
    // { id: 9, nome: "Arquitetura de Software" },
    // { id: 10, nome: "Machine Learning" },
    // { id: 11, nome: "Fotografia" },
    // { id: 12, nome: "Ilustração" },
    // { id: 13, nome: "Contabilidade Financeira" },
    // { id: 14, nome: "Engenharia de Dados" },
    // { id: 15, nome: "Liderança de Equipe" },
    // { id: 16, nome: "Gestão de Recursos Humanos" },
    // { id: 17, nome: "Marketing de Conteúdo" },
    // { id: 18, nome: "Administração de Banco de Dados" },
    // { id: 19, nome: "Desenho Técnico" },
    // { id: 20, nome: "Copywriting" },
    // { id: 21, nome: "Estratégia de Negócios" },
    // { id: 22, nome: "Gestão de Projetos Ágeis" },
    // { id: 23, nome: "Desenvolvimento Mobile" },
    // { id: 24, nome: "Marketing de Mídia Social" },
    // { id: 25, nome: "Engenharia de Software" },
    // { id: 26, nome: "Bioinformática" },
    // { id: 27, nome: "Design de Interface de Usuário" },
    // { id: 28, nome: "Pesquisa de Mercado" },
    // { id: 29, nome: "Gestão de Qualidade" },
    // { id: 30, nome: "Desenvolvimento de Jogos" },
  ];
  return (
    <>
      <Navbar />
      <div className="max-w-7xl my-0 mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">Gerenciar colaboradores</h1>
            <Table users={users} admin />
          </div>
          <div className="h-0.5 rounded-full bg-gray-200 my-8" />
          <div>
            <h1 className="text-2xl font-bold mb-4">Gerenciar habilidades</h1>
            <SkillsTable skills={skills} />
          </div>
        </div>
      </div>
      <SkillModal show={showSkillModal} />
    </>
  );
}
