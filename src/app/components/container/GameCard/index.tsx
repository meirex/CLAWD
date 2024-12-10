'use client'


import Image from "next/image";
import Link from "next/link";
import { GameProps } from "@/utils/types/game";
import { motion } from "framer-motion";
import { FaRegArrowAltCircleRight, FaStar } from "react-icons/fa";


interface GameCardProps {
  data: GameProps;
}


export function GameCard({ data }: GameCardProps) {
  return (
    <motion.section // Animação de fade-in e deslizamento na exibição
      initial={{ opacity: 0, y: 20 }} // Estado inicial com opacidade 0 e deslocamento vertical
      animate={{ opacity: 1, y: 0 }} // Estado final (visível e na posição original)
      transition={{ duration: 0.5 }} // Duração da animação de entrada
    >
      <Link href={`/game/${data.id}`}>
        <motion.div // Container interativo com animações de hover e clique
          whileHover={{ scale: 1.03 }} // Aumenta o tamanho do cartão ao passar o mouse
          whileTap={{ scale: 0.97 }} // Diminui o tamanho do cartão ao clicar
          transition={{ type: "spring", stiffness: 300, damping: 10 }} // Configuração da animação
          className="relative w-full h-80 rounded-xl overflow-hidden mb-6 group cursor-pointer"
        >
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            src={data.background_image}
            alt={data.name}
            quality={100}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" // Gradiente para sobrepor a imagem
            initial={{ opacity: 0.6 }} // Opacidade inicial
            whileHover={{ opacity: 1 }} // Opacidade ao passar o mouse
            transition={{ duration: 0.3 }} // Duração da transição de opacidade
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm bg-black/30" // Container do texto sobre o fundo com desfoque
            initial={{ y: 20, opacity: 0 }} // Estado inicial de animação
            whileHover={{ y: 0, opacity: 1 }} // Estado quando o mouse passa por cima
            transition={{ duration: 0.3 }} // Duração da animação de entrada
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white truncate pr-2">{data.name}</h3>
              <motion.div
                whileHover={{ x: 5 }} // Efeito de movimento horizontal ao passar o mouse
                transition={{ type: "spring", stiffness: 400, damping: 10 }} // Configuração da animação de movimento
              >
                <FaRegArrowAltCircleRight className="text-white text-xl" />
              </motion.div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <FaStar className="text-yellow-400" />
                <span className="text-sm font-medium text-white">{data.rating.toFixed(1)}</span>
              </div>
              <span className="truncate inline-block max-w-[100px] text-sm font-medium text-white bg-red-600 px-2 py-1 rounded-full">
                {data.genres[0]?.name || "N/A"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.section>
  );
}
