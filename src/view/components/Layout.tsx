import React , { ReactNode } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";


export function Layout({children}: {children: ReactNode}){

  const navigate = useNavigate()
  const {pathname} = useLocation()

  const screens = [
    {name: 'Dashboard', path: '/'},
    {name: 'Orderns de Serviço', path: '/test'},
    {name: 'Ações Preventivas', path: ''},
    {name: 'Admin', path: ''},
  ]

  return (
    <main className="grid grid-rows-[50px_1fr] " >
      <nav className="text-zinc-800 border-b border-zinc-300 flex items-center px-2 bg-zinc-50" >
        <h1 className="font-bold text-lg mr-16" >Adler Pelzer Group</h1>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
            {screens.map(({name, path}) => (
              <button onClick={() => navigate(path)} >
                <NavigationMenuLink className={twMerge(
                    navigationMenuTriggerStyle(),
                    "font-medium text-sm p-2 text-zinc-400 flex gap-4 hover:font-semibold rounded-xl",
                    pathname === path&& 'text-zinc-800 font-semibold'
                  )}>
                  {name}
                </NavigationMenuLink>
              </button>
            ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
      <section>
        {children}
      </section>
    </main>
  )
}
