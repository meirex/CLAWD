import { Input } from "@/app/components/container/input";
import { GameProps } from "@/utils/types/game";
import Image from "next/image"
import { FaStar, FaCalendar, FaGamepad, FaGlobe } from "react-icons/fa";

// buscar dados do jogo com base no ID
async function getData(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/games/${id}?key=${process.env.API_KEY}`,
      { next: { revalidate: 60 } } // configuração para revalidar os dados 
    )
    if (!res.ok) { // checa se a resposta não é válida
      throw new Error("failed to fetch data") // lança erro caso a resposta seja inválida
    }
    const data: GameProps = await res.json() // converte para json
    return data

  } catch (err) {
    // mensagem de erro no console e retorno de `null` em caso de falha
    console.error("failed to fetch data", err)
    return null
  }
}

interface PageProps {
  params: { id: string }
}

export default async function Game({ params }: PageProps) {
  const { id } = params;
  // Chama a função de busca de dados e armazena o resultado
  const data = await getData(id);

  if (!data) {
    return (
      // Exibe uma tela de erro  ao usuário
      <main className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Falha no carregamento...</h1>
          <p className="text-gray-300">
            Não foi possível carregar os dados do jogo. Por favor, tente novamente mais tarde.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-br to-gray-900 from-gray-800 text-white">
      <div className="relative h-[50vh] w-full">
        {data.background_image && ( // Renderiza a imagem somente se ela existir
          <Image
            src={data.background_image}
            alt={data.name || 'Game image'}
            layout="fill"
            objectFit="cover"
            priority={true}
            className="brightness-50"
          />
        )}
        {/* Sobreposição de texto e informações principais */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-center px-4 mb-4">
            {data.name}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full flex items-center">
              <FaStar className="mr-1" /> {data.rating.toFixed(1)}
            </span>
            <span className="bg-blue-500 px-3 py-1 rounded-full flex items-center">
              <FaCalendar className="mr-1" /> {data.released || 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal com detalhes do jogo */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-yellow-400">Sobre o Jogo</h2>
          {/* Conteúdo HTML seguro para exibir descrições do jogo */}
          <div
            className="text-gray-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        {/* Seção de gêneros do jogo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 ">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-400">
              <FaGamepad className="mr-2" />
              Gêneros
            </h2>
            <ul className="space-y-2">
              {data.genres.map((genre, index) => ( // Mapeia e exibe cada gênero
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Seção de plataformas do jogo */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 ">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-400">
              <FaGlobe className="mr-2" />
              Plataformas
            </h2>
            <ul className="space-y-2">
              {data.platforms.map((platform, index) => ( // Mapeia e exibe cada plataforma
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  {platform.platform.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

