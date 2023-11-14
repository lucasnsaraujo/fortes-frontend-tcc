import Navbar from "../../components/Navbar";
import { UserDescription } from "../../components/UserDescription";
import { Table } from "../../components/UsersTable";
import { useState } from "react";

export default function Search() {
  const [moreInformation, setMoreInformation] = useState(null);

  function openUserPreview(userId) {
    setMoreInformation(users.find((user) => user.id === userId));
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

  return (
    <>
      <Navbar />
      <div className="max-w-7xl my-0 mx-auto py-8 px-4">
        <h1 className="mb-4 text-2xl font-semibold">
          Buscar colaborador por habilidade
        </h1>
        <Table users={users} openUserPreview={openUserPreview} />
      </div>
      <UserDescription
        show={moreInformation}
        user={moreInformation}
        close={() => setMoreInformation(null)}
      />
    </>
  );
}
