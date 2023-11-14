import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../utils/tailwind";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 border border-b-gray-200">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <a
              className="inline-flex items-center gap-x-2 text-xl font-semibold "
              href="#"
            >
              <img
                className="w-28 h-auto"
                src="/images/fortes.png"
                alt="Logo"
              />
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                data-hs-collapse="#navbar-image-and-text-2"
                aria-controls="navbar-image-and-text-2"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-image-and-text-2"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <Link
                className={cn(
                  "font-medium text-gray-600 hover:text-gray-400",
                  pathname === "/search" && "text-blue-500"
                )}
                to="/search"
                aria-current="page"
              >
                Busca
              </Link>

              <Link
                className={cn(
                  "font-medium text-gray-600 hover:text-gray-400",
                  pathname === "/admin" && "text-blue-500"
                )}
                to="/admin"
              >
                Painel Administrador
              </Link>
              <Link
                className={cn(
                  "font-medium text-gray-600 hover:text-gray-400",
                  pathname === "/profile" && "text-blue-500"
                )}
                to="/profile"
              >
                Minha Conta
              </Link>
              <button
                className="font-medium text-white bg-red-600 hover:bg-red-400 rounded-md py-1 px-4"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
