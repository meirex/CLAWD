'use client'
import { useState, useEffect } from 'react'

// componente que envolve elementos para adicionar uma animação de transição de opacidade
export function AnimationWrapper({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  // useEffect dispara ao montar o componente, ativando a transição
  useEffect(() => {
    setIsVisible(true) // Altera o estado para ativar a classe de opacidade
  }, []) // Dependência vazia garante execução apenas na montagem

  return (
    // div com classes dinâmicas aplicando a animação de opacidade suave
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0' // Alterna entre visível e invisível
      }`}
    >
      {children} {/* renderiza os elementos filhos com a animação aplicada */}
    </div>
  )
}
