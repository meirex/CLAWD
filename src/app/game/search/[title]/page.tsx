import { Container } from "@/app/components/container";
import { GameCard } from "@/app/components/container/GameCard";
import { Input } from "@/app/components/container/input";
import { GameProps } from "@/utils/types/game";

// função para buscar dados da API com base no título 
async function getData(title: string) {
  console.log("Searching for:", title);
  try {
    // realiza a requisição para a API, buscando jogos relacionados ao título
    const res = await fetch(`${process.env.API_URL}/games?key=${process.env.API_KEY}&search=${encodeURIComponent(title)}&ordering=-relevance,-released&page_size=15`);
    if (!res.ok) {
      throw new Error('Failed to fetch data'); // lança um erro se a resposta nao for bem-sucedida
    }
    const data = await res.json(); // Converte a resposta para JSON
    return data.results; // Retorna os resultados da busca
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
}

export default async function Search({
  params: { title }
}: {
  params: { title: string }
}) {

  const games: GameProps[] = await getData(title);

  // Filtra os jogos para incluir apenas aqueles com rating maior que 3
  const filteredGames = games ?
    games.filter(game => game.rating > 4).sort((a, b) => b.rating - a.rating) : [];

  return (
    <main className="w-full">
      <Container>
        <Input />

        <h1 className="font-bold text-xl mt-8 mb-5">Veja o que encontramos</h1>

        {/* Mensagem de erro se a busca falhar */}
        {!games && (
          <p>Ocorreu um erro ao buscar os jogos. Por favor, tente novamente.</p>
        )}

        {/* Mensagem se nenhum jogo for encontrado */}
        {filteredGames.length === 0 && (
          <p>Nenhum jogo encontrado com esse título.</p>
        )}

        {/* Seção para exibir os jogos filtrados */}
        <section className="w-full grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredGames.map(item => (
            <GameCard key={item.id} data={item} /> // Renderiza cada jogo encontrado
          ))}
        </section>
      </Container>
    </main>
  );
}