import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { UserDescription } from "../../components/UserDescription";
import { Table } from "../../components/UsersTable";
import { pb } from "../../services/pocketbase";

export default function Search() {
  const [moreInformation, setMoreInformation] = useState(null);
  const [users, setUsers] = useState([]);

  function openUserPreview(userId) {
    setMoreInformation(users.find((user) => user.id === userId));
  }

  useEffect(() => {
    const fetchData = async () => {
      const usersReturned = await pb.collection("usuarios").getFullList();
      const usersSkills = await pb
        .collection("habilidadeUsuario")
        .getFullList({ expand: "habilidadeId" });

      const parsed = usersReturned.map((user) => {
        const skills = usersSkills.filter(
          (skill) => skill.usuarioId === user.id
        );
        return {
          id: user.codigoFuncionario,
          name: user.nome,
          skills: skills.map((skill) => ({
            name: skill.expand.habilidadeId.nome,
            expertise: skill.nivelExpertise,
            experience: skill.tempoExperiencia,
          })),
        };
      });

      setUsers(parsed);
    };
    fetchData();
  }, []);

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
