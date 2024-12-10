// aqui eu definino a interface GameProps, que descreve a estrutura dos dados de um jogo (pro typescript é necessario essa tipagem)
export interface GameProps {
  id: number,
  name: string,
  background_image: string,
  description: string,
  genres: Array<{ name: string }>,
  platforms: Array<{ platform: { name: string } }>,
  released: string,
  rating: number
}

