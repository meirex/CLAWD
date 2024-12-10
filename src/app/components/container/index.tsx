import { ReactNode } from "react";
// importa o ReactNode, que é usado para tipar qualquer conteúdo que pode ser renderizado no React (ex: texto, componentes, JSX)

export function Container({ children }: { children: ReactNode }) {
  // o componente container é um componente funcional que recebe uma propriedade children
  // children pode ser qualquer conteúdo dentro do componente container (outros componentes ou jsx).

  return (
    <div className="max-w-screen-xl mx-auto px-3">
      {children} {/* renderiza o conteúdo passado para o componente 'Container' */}
    </div>
  );
}
