import { useState } from "react";
import { cn } from "../../utils/tailwind";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";

export function UserDescription(props) {
  const stars = [
    { value: 1, id: 1 },
    { value: 2, id: 2 },
    { value: 3, id: 3 },
    { value: 4, id: 4 },
    { value: 5, id: 5 },
  ];
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
              "relative flex gap-24 flex-row p-16 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] transition-all duration-300",
              !props?.show && "-mt-8"
            )}
          >
            <div
              onClick={() => props.close()}
              className="p-2 absolute text-xl hover:bg-gray-200 active:bg-gray-300 rounded-md right-4 top-4 cursor-pointer transition-all"
            >
              <AiOutlineClose />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="mb-6">
                <strong>
                  Nome do colaborador: <br />
                </strong>
                {props?.user?.name}
              </h1>
              <h2>
                <strong>
                  Número de registro: <br />{" "}
                </strong>{" "}
                {props?.user?.id}{" "}
              </h2>
            </div>
            <div className="flex flex-col">
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
                            Tempo de experiência
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
                        {props?.user?.skills.map((skill, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {skill.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {!skill.experience
                                ? "Menos de um ano"
                                : skill.experience === 1
                                ? `${skill.experience} ano`
                                : `${skill.experience} anos`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 flex flex-row max-h-96">
                              {stars.map((star, index) => (
                                <AiFillStar
                                  key={index}
                                  className={cn(
                                    "text-xl text-gray-300 hover:text-gray-400 cursor-pointer",
                                    skill?.expertise >= star.value &&
                                      "text-yellow-400 hover:text-yellow-500"
                                  )}
                                />
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
