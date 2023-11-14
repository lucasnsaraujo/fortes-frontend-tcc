import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { SkillModal } from "../../components/SkillModal";
import { SkillsTable } from "../../components/SkillsTable";
import { Table } from "../../components/UsersTable";
import { UserModal } from "../../components/UserModal";
import { DeleteModal } from "../../components/DeleteModal";

export default function Admin() {
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillForm, setSkillForm] = useState({});

  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({});

  const [itemToDelete, setItemToDelete] = useState(null);

  function deleteItem() {
    console.log("deleting item");
    setItemToDelete(false);
  }

  const users = [
    {
      id: 1,
      name: "João da Silva Santos",
      skills: [
        {
          name: "Comunicação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Redação",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Programação em Python",
          expertise: 4,
          experience: 2,
        },
      ],
    },
    {
      id: 2,
      name: "Maria Oliveira Pereira",
      skills: [
        {
          name: "Comunicação",
          expertise: 3,
          experience: 2,
        },
        {
          name: "Redação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Design Gráfico",
          expertise: 5,
          experience: 4,
        },
      ],
    },
    {
      id: 3,
      name: "José da Silva Junior",
      skills: [
        {
          name: "Programação em Python",
          expertise: 5,
          experience: 5,
        },
        {
          name: "Análise de Dados",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Marketing Digital",
          expertise: 3,
          experience: 2,
        },
      ],
    },
    {
      id: 4,
      name: "Ana Paula Gonçalves",
      skills: [
        {
          name: "Comunicação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Design Gráfico",
          expertise: 3,
          experience: 2,
        },
        {
          name: "Redação",
          expertise: 4,
          experience: 3,
        },
      ],
    },
    {
      id: 5,
      name: "Pedro Oliveira",
      skills: [
        {
          name: "Programação em Python",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Análise de Dados",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Marketing Digital",
          expertise: 3,
          experience: 2,
        },
      ],
    },
    {
      id: 6,
      name: "Mariana da Cruz",
      skills: [
        {
          name: "Comunicação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Redação",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Design Gráfico",
          expertise: 4,
          experience: 3,
        },
      ],
    },
    {
      id: 7,
      name: "Carlos Santos",
      skills: [
        {
          name: "Programação em Python",
          expertise: 5,
          experience: 5,
        },
        {
          name: "Análise de Dados",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Marketing Digital",
          expertise: 3,
          experience: 2,
        },
      ],
    },
    {
      id: 8,
      name: "Lúcia Martins",
      skills: [
        {
          name: "Comunicação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Redação",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Design Gráfico",
          expertise: 5,
          experience: 4,
        },
      ],
    },
    {
      id: 9,
      name: "Ricardo Silva",
      skills: [
        {
          name: "Programação em Python",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Análise de Dados",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Marketing Digital",
          expertise: 3,
          experience: 2,
        },
      ],
    },
    {
      id: 10,
      name: "Fernanda Souza",
      skills: [
        {
          name: "Comunicação",
          expertise: 3,
          experience: 2,
        },
        {
          name: "Redação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Design Gráfico",
          expertise: 4,
          experience: 3,
        },
      ],
    },
    {
      id: 11,
      name: "André Oliveira",
      skills: [
        {
          name: "Programação em Python",
          expertise: 5,
          experience: 5,
        },
        {
          name: "Análise de Dados",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Marketing Digital",
          expertise: 3,
          experience: 2,
        },
      ],
    },
    {
      id: 12,
      name: "Beatriz Ferreira",
      skills: [
        {
          name: "Comunicação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Redação",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Design Gráfico",
          expertise: 4,
          experience: 3,
        },
      ],
    },
    {
      id: 13,
      name: "Lucas Pereira",
      skills: [
        {
          name: "Programação em Python",
          expertise: 5,
          experience: 5,
        },
        {
          name: "Análise de Dados",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Marketing Digital",
          expertise: 3,
          experience: 2,
        },
      ],
    },
    {
      id: 14,
      name: "Juliana Santos",
      skills: [
        {
          name: "Comunicação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Redação",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Programação em Python",
          expertise: 4,
          experience: 2,
        },
      ],
    },
    {
      id: 15,
      name: "Rodrigo Almeida",
      skills: [
        {
          name: "Comunicação",
          expertise: 4,
          experience: 3,
        },
        {
          name: "Redação",
          expertise: 5,
          experience: 4,
        },
        {
          name: "Design Gráfico",
          expertise: 5,
          experience: 4,
        },
      ],
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
            <Table
              users={users}
              admin
              setShowModal={setShowUserModal}
              delete={setItemToDelete}
            />
          </div>
          <div className="h-0.5 rounded-full bg-gray-200 my-8" />
          <div>
            <h1 className="text-2xl font-bold mb-4">Gerenciar habilidades</h1>
            <SkillsTable
              skills={skills}
              setShowSkillModal={setShowSkillModal}
              delete={setItemToDelete}
            />
          </div>
        </div>
      </div>
      <UserModal
        show={showUserModal}
        setShow={setShowUserModal}
        delete={setItemToDelete}
      />
      <SkillModal
        show={showSkillModal}
        setShow={setShowSkillModal}
        delete={setItemToDelete}
      />
      <DeleteModal
        show={itemToDelete}
        setShow={setItemToDelete}
        delete={deleteItem}
      />
    </>
  );
}
