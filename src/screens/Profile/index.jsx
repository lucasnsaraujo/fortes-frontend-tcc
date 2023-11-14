import { useState } from "react";
import { Modal } from "../../components/Modal";
import Navbar from "../../components/Navbar";

import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
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

  console.log(selectedSkills);

  const skills = [
    { id: 1, nome: "Programação em Python" },
    { id: 2, nome: "Desenvolvimento Web" },
    { id: 3, nome: "Gestão de Projetos" },
    { id: 4, nome: "Marketing Digital" },
    { id: 5, nome: "Design Gráfico" },
    { id: 6, nome: "Análise de Dados" },
    { id: 7, nome: "Redação Criativa" },
    { id: 8, nome: "Gerenciamento de Redes Sociais" },
    { id: 9, nome: "Arquitetura de Software" },
    { id: 10, nome: "Machine Learning" },
    { id: 11, nome: "Fotografia" },
    { id: 12, nome: "Ilustração" },
    { id: 13, nome: "Contabilidade Financeira" },
    { id: 14, nome: "Engenharia de Dados" },
    { id: 15, nome: "Liderança de Equipe" },
    { id: 16, nome: "Gestão de Recursos Humanos" },
    { id: 17, nome: "Marketing de Conteúdo" },
    { id: 18, nome: "Administração de Banco de Dados" },
    { id: 19, nome: "Desenho Técnico" },
    { id: 20, nome: "Copywriting" },
    { id: 21, nome: "Estratégia de Negócios" },
    { id: 22, nome: "Gestão de Projetos Ágeis" },
    { id: 23, nome: "Desenvolvimento Mobile" },
    { id: 24, nome: "Marketing de Mídia Social" },
    { id: 25, nome: "Engenharia de Software" },
    { id: 26, nome: "Bioinformática" },
    { id: 27, nome: "Design de Interface de Usuário" },
    { id: 28, nome: "Pesquisa de Mercado" },
    { id: 29, nome: "Gestão de Qualidade" },
    { id: 30, nome: "Desenvolvimento de Jogos" },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl my-0 mx-auto py-8 px-4 pb-24">
        <h1 className="text-2xl font-semibold mb-8">Minha Conta</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div>
            <h1 className="text-md mb-2">Nome completo</h1>
            <input
              type="text"
              className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Insira seu nome completo"
            />
          </div>
          <div>
            <h1 className="text-md mb-2">Número de cadastro</h1>
            <input
              type="text"
              className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              placeholder="Insira seu número de cadastro no banco da Fortes"
              maxLength={9}
            />
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-md mb-2">Habilidades</h1>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
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
        <button
          type="button"
          onClick={submitForm}
          className="py-3 px-4 w-full lg:w-1/4 inline-flex justify-center mt-8 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          Salvar
        </button>
      </div>

      <Modal showing={showingModal} title={"teste"} description={"teste"} />
    </>
  );
}
