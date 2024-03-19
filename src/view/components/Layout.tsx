import React from "react";
import { Profile } from "./Profile";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout(){

  return (
    <main className="grid grid-rows-[50px_1fr] " >
      <nav className="text-zinc-800 border-b border-zinc-300 flex items-center px-4 bg-zinc-50" >
        <h1 className="w-56 font-bold text-lg text-blue-700" >Adler Pelzer Group</h1>
        <div className="w-full ml-4" >
          <Navbar />
        </div>
        <div>
          <Profile />
        </div>
      </nav>
      <section>
        <Outlet/>
      </section>
    </main>
  )
}


/* <NavigationMenu>
            {screens.map(({name, path, subPaths}) => {

              if(subPaths){
                return (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent className="relative" >
                      <ul className="flex flex-col p-2 gap-3">
                        {subPaths.map((subPath) => (
                         <button onClick={() => navigate(path + subPath.path)}  className={twMerge(
                            pathname === path&& 'text-zinc-800 font-semibold'
                          )}>
                            {subPath.name}
                          </button>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }

              return (
                <button onClick={() => navigate(path)} >
                  <NavigationMenuLink className={twMerge(
                      navigationMenuTriggerStyle(),
                      "font-medium text-sm p-2 text-zinc-400 flex gap-4 hover:font-semibold rounded-xl",
                      pathname === path&& 'text-zinc-800 font-semibold'
                    )}>
                    {name}
                  </NavigationMenuLink>
                </button>
              )

            })}
          </NavigationMenu> */
