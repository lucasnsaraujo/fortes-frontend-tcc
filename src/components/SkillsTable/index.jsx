import { useMemo, useState } from "react";
import { FaPlusCircle, FaSpinner } from "react-icons/fa";

function SkillsTable(props) {
  const [search, setSearch] = useState();

  const skillsShown = useMemo(() => {
    if (!search) return props?.skills;

    console.log({ search });
    return props?.skills?.filter((skill) =>
      skill?.nome?.toLowerCase()?.includes(search?.toLowerCase())
    );
  }, [search, props.skills]);

  console.log(skillsShown);
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <div className="py-3 px-4 flex flex-row justify-between">
              <div className="relative max-w-xs ">
                <label className="sr-only">Buscar colaborador</label>
                <input
                  defaultValue={props?.skill?.nome ?? ""}
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="py-2 px-3 ps-9 flex flex-1 w-96 border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Pesquise por habilidade"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
              <button
                type="button"
                className="px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={props.handleAddSkillModalMode}
              >
                <FaPlusCircle className="text-blue-800" /> Adicionar habilidade
              </button>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase w-0"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {skillsShown?.map((skill, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {skill.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium gap-8 flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={() => props.handleEditClick(skill.id)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={() =>
                            props.delete({ type: "skill", id: skill.id })
                          }
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {skillsShown?.length < 1 && (
                <div className="w-full flex items-center justify-center p-8">
                  <FaSpinner
                    color="black"
                    className="animate-spin transform rotate-180"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SkillsTable };
