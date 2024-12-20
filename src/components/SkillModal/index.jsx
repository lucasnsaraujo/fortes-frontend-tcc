import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { pb } from "../../services/pocketbase";
import { cn } from "../../utils/tailwind";

export function SkillModal(props) {
  const [nameField, setNameField] = useState();

  async function handleClick() {
    // atualizar name da modal
    if (props.skillModalMode === "add") {
      await handleCreate(nameField);
    } else {
      await handleUpdate(props.id, nameField);
    }
  }

  async function handleUpdate(id, name) {
    await pb.collection("habilidades").update(id, {
      nome: name,
    });
    props.setShow(false);
    window.location.reload();
  }

  async function handleCreate(name) {
    await pb.collection("habilidades").create({
      nome: name,
    });
    props.setShow(false);
    window.location.reload();
  }
  useEffect(() => {
    const selectedSkill = props.skills.find((skill) => skill.id === props.id);
    if (selectedSkill) {
      setNameField(selectedSkill?.nome);
    }
  }, [props.id]);

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
              {props.skillModalMode === "add"
                ? "Adicionar habilidade"
                : "Editar habilidade"}
            </h1>
            <div className="grid grid-cols-1 w-96 gap-8 mb-6">
              <div>
                <h1 className="text-md mb-2">Nome</h1>
                <input
                  onChange={(e) => setNameField(e.target.value)}
                  defaultValue={props.skillModalMode !== "add" ? nameField : ""}
                  type="text"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Insira o nome da habilidade"
                />
              </div>
            </div>
            <button
              type="button"
              className="py-3 px-4 w-full flex flex-1 justify-center mt-8 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={handleClick}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
