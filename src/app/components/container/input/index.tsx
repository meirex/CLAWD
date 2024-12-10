"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Loader } from "../../loader";

export function Input() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // obtendo a função de navegação, que permite redirecionar o usuário para outra página.

  // Função assíncrona para lidar com a pesquisa quando o formulário for submetido
  async function HandleSearch(e: FormEvent) {
    e.preventDefault();

    if (input === "") return; // Se o campo de entrada estiver vazio, a função é interrompida, não fazendo nada.

    setIsLoading(true); // Ativa o estado de "carregando" (isLoading) para mostrar o loader enquanto espera pela busca.

    // Simulando um delay pro loader
    await new Promise(resolve => setTimeout(resolve, 1000));

    router.push(`/game/search/${input}`);
  }

  return (
    <form
      className="w-full p-2 my-5 flex items-center justify-between rounded-full"
      onSubmit={HandleSearch}
    >
      <div className="relative w-full rounded-full">
        <input
          className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white font-roboto ring-1 ring-zinc-100 focus:ring-2
        outline-none duration-300 placeholder:text-zinc-400
         placeholder:opacity-50 rounded-md px-4 py-2 shadow-md focus:shadow-md
         "
          placeholder="Pesquise por um jogo..."
          type="text"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 transform -translate-y-1/2"
          disabled={isLoading}
        >
          {isLoading ? (  // Se estiver carregando, exibe o componente Loader, caso contrário, exibe o ícone de busca.
            <Loader />
          ) : (
            <FiSearch size={24} /> // O ícone de busca é renderizado enquanto não estiver carregando.
          )}
        </button>
      </div>
    </form>
  );
}

