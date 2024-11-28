import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import Navbar from "../../components/Navbar";

import { FaMinusCircle, FaPlusCircle, FaSpinner } from "react-icons/fa";
import { StarRating } from "../../components/StarRating";
import { pb } from "../../services/pocketbase";
import { cn } from "../../utils/tailwind";

export default function Search() {
  const [showingModal, setShowingModal] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  function submitForm() {
    setShowingModal(true);
    setTimeout(() => setShowingModal(false), 3500);
  }

  function addSkill(selectedSkill) {
    const alreadySelected = selectedSkills.some(
      (skill) => skill.id === selectedSkill.id
    );
    if (!alreadySelected) {
      setSelectedSkills((current) => [...current, selectedSkill]);
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
    allSelectedSkills[selectedIndex].expertise = value;
    setSelectedSkills(allSelectedSkills);
  }

  function setExperience(skillId, value) {
    const allSelectedSkills = JSON.parse(JSON.stringify(selectedSkills));
    const selectedIndex = allSelectedSkills.findIndex(
      (item) => item.id === skillId
    );
    allSelectedSkills[selectedIndex].experience = value;
    setSelectedSkills(allSelectedSkills);
  }

  const [skills, setSkills] = useState();
  const [name, setName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [user, setUser] = useState();

  async function handleSave() {
    if (!name || !registerNumber || selectedSkills.length === 0) {
      alert("Preencha todos os campos!");
      return;
    }
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
    window.location.reload();
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const currentUser = JSON.parse(localStorage.getItem("@user"));
      const userData = await pb.collection("usuarios").getOne(currentUser?.id);

      setUser(userData);

      setName(userData.nome);
      setRegisterNumber(userData.codigoFuncionario);

      const usersSkills = await pb
        .collection("habilidadeUsuario")
        .getFullList({ expand: "habilidadeId" });

      const skillsData = await pb.collection("habilidades").getFullList();

      setSkills(skillsData);

      const userSkills = usersSkills.filter(
        (skill) => skill.usuarioId === userData.id
      );
      const parsed = userSkills.map((skill) => ({
        id: skill.expand.habilidadeId.id,
        nome: skill.expand.habilidadeId.nome,
        expertise: skill.nivelExpertise,
        experience: skill.tempoExperiencia,
      }));

      setSelectedSkills(parsed);

      setSkills(
        skillsData.map((skill) => ({ id: skill.id, nome: skill.nome }))
      );

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl my-0 mx-auto py-8 px-4 pb-24">
        <h1 className="text-2xl font-semibold mb-8">Minha Conta</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div>
            <h1 className="text-md mb-2">Nome completo</h1>
            {loading ? (
              <div className="w-full flex p-4">
                <FaSpinner
                  color="black"
                  className="animate-spin transform rotate-180"
                />
              </div>
            ) : (
              <input
                type="text"
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Insira seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </div>
          <div>
            <h1 className="text-md mb-2">Número de cadastro</h1>
            {loading ? (
              <div className="w-full flex p-4">
                <FaSpinner
                  color="black"
                  className="animate-spin transform rotate-180"
                />
              </div>
            ) : (
              <input
                type="text"
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Insira seu número de cadastro no banco da Fortes"
                maxLength={9}
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
              />
            )}
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-md mb-2">Habilidades</h1>
            <div className="flex flex-wrap gap-3">
              {skills?.map((skill) => (
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
          <div className="lg:col-span-2">
            {/* Table */}
            {!!selectedSkills.length && (
              <div className="flex flex-col max-h-96">
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
                                  value={skill.experience}
                                  onChange={(e) =>
                                    setExperience(skill.id, e.target.value)
                                  }
                                  className="py-1 px-4 w-24 border block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                >
                                  <option selected>0</option>
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
          </div>
        </div>
        {loading && (
          <div className="w-full flex flex-1 justify-center items-center p-4">
            <FaSpinner
              color="black"
              className="animate-spin transform rotate-180"
            />
          </div>
        )}
        <button
          type="button"
          onClick={handleSave}
          className="py-3 px-4 w-full lg:w-1/4 inline-flex justify-center mt-8 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Salvar
        </button>
      </div>

      <Modal showing={showingModal} title={"teste"} description={"teste"} />
    </>
  );
}
