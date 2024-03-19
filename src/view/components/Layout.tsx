import React , { ReactNode } from "react";

export function Layout({children}: {children: ReactNode}){
  return (
    <main className="grid grid-rows-[50px_1fr] " >
      <nav className="text-zinc-800 border-b border-zinc-300 flex items-center px-2 bg-zinc-50" >
        <h1 className="font-bold text-lg mr-16" >Adler Pelzer Group</h1>
        <div  className="font-medium text-sm text-zinc-400 flex gap-4">
          <a className="hover:text-zinc-900" href="#">Ordens de Serviço</a>
          <a className="hover:text-zinc-900" href="#">Ações Preventivas</a>
          <a className="hover:text-zinc-900" href="#">Dashboard</a>
          <a className="hover:text-zinc-900" href="#">Admin </a>
        </div>
      </nav>
      <section>
        {children}
      </section>
    </main>
  )
}
