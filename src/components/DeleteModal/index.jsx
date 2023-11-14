import { useState } from "react";
import { cn } from "../../utils/tailwind";
import { AiOutlineClose } from "react-icons/ai";

export function DeleteModal(props) {
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
              "relative flex p-8 flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] transition-all duration-300",
              !props?.show && "-mt-8"
            )}
          >
            <div
              onClick={() => props.setShow(false)}
              className="p-2 absolute text-xl hover:bg-gray-200 active:bg-gray-300 rounded-md right-4 top-4 cursor-pointer transition-all"
            >
              <AiOutlineClose />
            </div>
            <h1 className="text-2xl font-semibold text-red-500">Atenção!</h1>
            <span className="text-base ">
              Tem certeza de que deseja remover este item? Esta ação é
              irreversível
            </span>
            <div className="flex flex-row justify-end flex-1 w-full mt-10 gap-2">
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={() => props.setShow(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:bg-red-800/30 dark:hover:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 transition-all"
                onClick={() => props?.delete()}
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
