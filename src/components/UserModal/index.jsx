import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { pb } from "../../services/pocketbase";
import { cn } from "../../utils/tailwind";
import { StarRating } from "../StarRating";

export function UserModal(props) {
  const [selectedSkills, setSelectedSkills] = useState([]);

  function addSkill(selectedSkill) {
    const alreadySelected = selectedSkills.some(
      (skill) => skill.id === selectedSkill.id
    );
    if (!alreadySelected) {
      setSelectedSkills((current) => [
        ...current,
        { ...selectedSkill, expertise: 1, experience: 0 },
      ]);
    } else {
      setSelectedSkills((current) =>
        current.filter((skill) => skill.id !== selectedSkill.id)
      );
    }
  }

  function setExpertise(skillId, value) {
    const allSelectedSkills = JSON.parse(JSON.stringify(selectedSkills));
    const selectedIndex = allSelectedSkills.findIndex(
      (item) => item.id === skillId
    );
    allSelectedSkills[selectedIndex].expertise = Number(value);
    setSelectedSkills(allSelectedSkills);
  }

  function setExperience(skillId, value) {
    const allSelectedSkills = JSON.parse(JSON.stringify(selectedSkills));
    const selectedIndex = allSelectedSkills.findIndex(
      (item) => item.id === skillId
    );
    allSelectedSkills[selectedIndex].experience = Number(value);
    setSelectedSkills(allSelectedSkills);
  }

  const [name, setName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");

  async function handleSave() {
    if (!name || !registerNumber || selectedSkills.length === 0) {
      alert("Por favor, preencha todos os campos necessários");
      return;
    }

    try {
      if (props?.userModalMode === "edit") {
        const user = props.users.find((user) => user.id === props.userId);
        await pb.collection("usuarios").update(user.id, {
          nome: name,
          codigoFuncionario: registerNumber,
        });

        const items = await pb.collection("habilidadeUsuario").getFullList({
          filter: `usuarioId = "${user.id}"`,
        });

        for (let item of items) {
          await pb.collection("habilidadeUsuario").delete(item.id);
        }

        for (let skill of selectedSkills) {
          await pb.collection("habilidadeUsuario").create({
            usuarioId: user.id,
            habilidadeId: skill.id,
            tempoExperiencia: skill.experience,
            nivelExpertise: skill.expertise,
          });
        }
      } else {
        const userCreated = await pb.collection("usuarios").create({
          nome: name,
          codigoFuncionario: registerNumber,
        });

        for (let skill of selectedSkills) {
          await pb.collection("habilidadeUsuario").create({
            usuarioId: userCreated.id,
            habilidadeId: skill.id,
            tempoExperiencia: skill.experience,
            nivelExpertise: skill.expertise,
          });
        }
      }
    } catch (error) {
      alert("An error has occurred: ", error.message);
    }

    setSelectedSkills([]);
    setName("");
    setRegisterNumber("");

    props.setShow(false);
    window.location.reload();
  }

  console.log(selectedSkills);

  useEffect(() => {
    if (props?.userModalMode === "edit") {
      const user = props.users.find((user) => user.id === props.userId);
      console.log(user.skills);
      setName(user?.name);
      setRegisterNumber(user?.codigoFuncionario);
      setSelectedSkills(
        user?.skills.map((item) => ({ ...item, nome: item.name }))
      );
    }
  }, [props?.userModalMode, props?.user]);

  useEffect(() => {
    if (!props.show) {
      setName("");
      setRegisterNumber("");
      setSelectedSkills([]);
    }
  }, [props.show]);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 w-screen h-screen z-10 bg-gray-500/60 flex justify-center items-center transition-all duration-300 opacity-100",
          !props?.show && "opacity-0 invisible"
        )}
      >
        <div className="max-w-7xl">
          <div
            className={cn(
              "relative flex p-16 flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] transition-all duration-300",
              !props?.show && "-mt-8"
            )}
          >
            <div
              onClick={() => props.setShow(false)}
              className="p-2 absolute text-xl hover:bg-gray-200 active:bg-gray-300 rounded-md right-4 top-4 cursor-pointer transition-all"
            >
              <AiOutlineClose />
            </div>
            <h1 className="text-2xl font-semibold mb-8">
              {props.userModalMode === "add" ? "Adicionar" : "Editar"} usuário
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h1 className="text-md mb-2">Nome completo</h1>
                <input
                  type="text"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Insira seu nome completo"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <h1 className="text-md mb-2">Número de cadastro</h1>
                <input
                  type="text"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Insira seu número de cadastro no banco da Fortes"
                  maxLength={9}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  value={registerNumber}
                />
              </div>
              <div className="lg:col-span-2">
                <h1 className="text-md mb-2">Habilidades</h1>
                <div className="flex flex-wrap gap-3">
                  {props?.skills?.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => addSkill(skill)}
                      className={cn(
                        "flex justify-center font-light items-center gap-1 text-sm lg:text-base border border-gray-200 py-1 px-2 rounded-lg text-gray-500 hover:bg-gray-200 transition-all",
                        selectedSkills.some(
                          (selectedSkill) => selectedSkill.id === skill.id
                        ) && "bg-green-700 text-white hover:bg-green-900"
                      )}
                    >
                      {!selectedSkills.some(
                        (selectedSkill) => selectedSkill.id === skill.id
                      ) ? (
                        <FaPlusCircle className="text-green-700" />
                      ) : (
                        <FaMinusCircle className="text-white" />
                      )}
                      {skill.nome}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Table */}
            {!!selectedSkills.length && (
              <div className="flex flex-col max-h-44">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Habilidade
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Tempo de experiência (em anos)
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Expertise
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {selectedSkills.map((skill, index) => (
                            <tr key={index}>
                              <td className="w-1/2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {skill.nome}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <select
                                  value={String(skill.experience)}
                                  defaultValue={"0"}
                                  onChange={(e) =>
                                    setExperience(skill.id, e.target.value)
                                  }
                                  className="py-1 px-4 w-24 border block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                >
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6+</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <StarRating
                                  skillId={skill.id}
                                  expertise={skill.expertise}
                                  setExpertise={setExpertise}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* End table */}
            <button
              type="button"
              className="py-3 px-4 w-full flex flex-1 justify-center mt-8 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
