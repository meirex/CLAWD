import Image from 'next/image'
import Link from 'next/link'
import { IoGameController } from "react-icons/io5";

export function Header() {
  return (
    <header className="w-full h-28 bg-gradient-to-br from-gray-900 px-2">
      <div className="max-w-screen-xl mx-auto flex justify-center space items-center h-28 sm:justify-between" >
        <nav className='flex justify-center items-center gap-10'>
          <Link href='/'>
            <Image className='w-full'
              src="/logo.png"
              width={100}
              height={100}
              quality={100}
              priority={true}
              alt='logo do site'
            />
          </Link>

          <Link
            className="relative group font-roboto text-white"
            href="/"
          >
            GAMES
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-red-600 transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
          </Link>

          <Link
            className="relative group font-roboto text-white"
            href="/game/search"
          >
          </Link>
        </nav>
        
        <IoGameController className='text-3xl'/>
        
      </div>
    </header>
  )
}
