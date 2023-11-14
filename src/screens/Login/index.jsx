import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  async function handleLogin() {
    navigate("/search");
  }
  return (
    <div className="bg-zinc-50">
      <div className="max-w-3xl flex justify-between items-center my-0 mx-auto w-full h-screen">
        <img src="images/fortes.png" />
        <div className="flex flex-col w-96">
          <div className="mb-4">
            <label
              htmlFor="input-label"
              className="block text-sm font-medium mb-2"
            >
              Número de cadastro
            </label>
            <input
              type="text"
              id="input-label"
              className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="0000000000"
              maxLength={9}
            />
          </div>

          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <p
            className="text-sm text-gray-500 mt-2"
            id="hs-inline-input-helper-text"
          >
            Caso você não possua cadastro, contate o seu supervisor para obter
            acesso.
          </p>
        </div>
      </div>
    </div>
  );
}
