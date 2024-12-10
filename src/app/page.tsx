import { Container } from "./components/container";
import { GameProps } from "@/utils/types/game";
import { Input } from "@/app/components/container/input";
import { GameCard } from "./components/container/GameCard";


async function getGamesDb() {
  try {
    // Realiza a requisição para a API de jogos, os filtrando aleatoriamente so pra exibir nos cards ou slide
    const res = await fetch(`${process.env.API_URL}/games?key=${process.env.API_KEY}&dates=2024-01-01,2024-12-31&ordering=-added&page_size=20`, { next: { revalidate: 320 } });
    if (!res.ok) {
      throw new Error('Failed to fetch data') // lança um erro se a resposta nao for bem-sucedida
    }
    const data = await res.json(); // Converte a resposta para JSON
    return data.results; // Retorna o array de jogos
  } catch (err) {
    console.error("Failed to fetch data:", err); // Lança um erro se a requisição falhar
    return null
  }
}



// Componente principal da página inicial
export default async function Home() {

  // Busca os dados necessários
  const GamesDb: GameProps[] = await getGamesDb();

  // Prepara os itens para o componente SimpleSlide
  const slideItems = GamesDb.slice(0, 5).map(games => ({
    id: games.id,
    image: games.background_image,
    title: games.name
  }));

  return (
    <main className="flex">
      <Container>
        <Input />
        <h1 className="text-center font-bold text-5xl mt-16 mb-5">
          EXPLORE, DESCUBRA, SUPERE. TUDO ISSO NA<span className="text-red-500"> CLAWD</span>
        </h1>




        {/* Seção de jogos em destaque */}

        <h2 className="text-2xl font-bold mt-8 mb-5">
          Em alta no momento
          <p className="font-extralight text-gray-400">Jogos mais requisitados em tempo real</p>
        </h2>



        <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {GamesDb.map((item) => (
            <GameCard key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}
