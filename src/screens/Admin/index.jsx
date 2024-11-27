import { useEffect, useState } from "react";
import { DeleteModal } from "../../components/DeleteModal";
import Navbar from "../../components/Navbar";
import { SkillModal } from "../../components/SkillModal";
import { SkillsTable } from "../../components/SkillsTable";
import { UserModal } from "../../components/UserModal";
import { Table } from "../../components/UsersTable";
import { pb } from "../../services/pocketbase";

export default function Admin() {
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillForm, setSkillForm] = useState({});
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({});

  const [itemToDelete, setItemToDelete] = useState(null);

  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  const [skillModalMode, setSkillModalMode] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState();

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userModalMode, setUserModalMode] = useState("");

  async function deleteItem() {
    console.log({ selectedUserToDelete });
    if (!itemToDelete) return;

    if (itemToDelete?.type === "skill") {
      await pb.collection("habilidades").delete(itemToDelete?.id);
      window.location.reload();
      // delete skill
    } else {
      await pb.collection("usuarios").delete(selectedUserToDelete);
      window.location.reload();
      // delete user
    }

    setItemToDelete(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const usersReturned = await pb.collection("usuarios").getFullList();
      const usersSkills = await pb
        .collection("habilidadeUsuario")
        .getFullList({ expand: "habilidadeId" });

      const skillsData = await pb.collection("habilidades").getFullList();

      const parsed = usersReturned.map((user) => {
        const skills = usersSkills.filter(
          (skill) => skill.usuarioId === user.id
        );
        return {
          id: user.id,
          codigoFuncionario: user.codigoFuncionario,
          name: user.nome,
          skills: skills.map((skill) => ({
            id: skill.expand.habilidadeId.id,
            name: skill.expand.habilidadeId.nome,
            expertise: skill.nivelExpertise,
            experience: skill.tempoExperiencia,
          })),
        };
      });

      setSkills(
        skillsData.map((skill) => ({ id: skill.id, nome: skill.nome }))
      );

      setUsers(parsed);
    };
    fetchData();
  }, []);

  function handleEditClick(itemId) {
    setSelectedSkillId(itemId);
    setShowSkillModal(true);
    setSkillModalMode("edit");
  }

  function handleAddSkillModalMode() {
    setShowSkillModal(true);
    setSkillModalMode("add");
    setSelectedSkillId(null);
  }

  async function handleEditUser(id) {
    setSelectedUserId(id);
    setShowUserModal(true);
    setUserModalMode("edit");
  }

  async function handleRemoveUser(id) {
    setSelectedUserToDelete(id);
    setItemToDelete(id);
  }

  async function handleRemoveUserModal() {}

  useEffect(() => {
    if (!showUserModal) {
      setSelectedUserId(null);
      setUserModalMode(null);
      setSelectedUserToDelete(null);
    }
  }, [showUserModal]);

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
              selectedUserId={selectedUserId}
              skills={skills}
              userModalMode={userModalMode}
              setSelectedUserId={setSelectedUserId}
              setUserModalMode={setUserModalMode}
              handleEditUser={handleEditUser}
              handleRemoveUser={handleRemoveUser}
            />
          </div>
          <div className="h-0.5 rounded-full bg-gray-200 my-8" />
          <div>
            <h1 className="text-2xl font-bold mb-4">Gerenciar habilidades</h1>
            <SkillsTable
              skills={skills}
              setShowSkillModal={setShowSkillModal}
              delete={setItemToDelete}
              setSelectedSkillId={setSelectedSkillId}
              handleEditClick={handleEditClick}
              handleAddSkillModalMode={handleAddSkillModalMode}
            />
          </div>
        </div>
      </div>
      <UserModal
        users={users}
        skills={skills}
        show={showUserModal}
        setShow={setShowUserModal}
        delete={setItemToDelete}
        handleEditUser={handleEditUser}
        handleRemoveUser={handleRemoveUser}
        handleRemoveUserModal={handleRemoveUserModal}
        selectedUserId={selectedUserId}
        userModalMode={userModalMode}
        setUserModalMode={setUserModalMode}
        userId={selectedUserId}
      />
      <SkillModal
        skills={skills}
        show={showSkillModal}
        setShow={setShowSkillModal}
        delete={setItemToDelete}
        id={selectedSkillId}
        skillModalMode={skillModalMode}
      />
      <DeleteModal
        show={itemToDelete}
        setShow={setItemToDelete}
        delete={deleteItem}
        userId={selectedUserToDelete}
        users={users}
      />
    </>
  );
}
