import React from "react";
import { Outlet } from "react-router-dom";
import {

  Search
} from "lucide-react"
import { Input } from "./ui/input";
import { Profile } from "./Profile";
import { Navbar } from "./Navbar";
import { useAuth } from "../hooks/useAuth";

export function Layout(){

  const {isAuth} = useAuth()

  return (
    <main className="grid grid-rows-[60px_1fr] h-screen w-screen" >
      {/* <nav className="text-zinc-800 border-b border-zinc-300 flex items-center px-4" >
        <h1 className="w-56 font-bold text-lg text-primary" >Adler Pelzer Group</h1>
        <div className="w-full ml-4" >
          <Navbar />
        </div>
        <div>
          <Profile />
        </div>
      </nav> */}
      <header className="flex items-center gap-4 border-b bg-background px-4">
        <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <h1 className="w-56 font-bold text-lg text-primary" >Adler Pelzer Group</h1>
          <Navbar />
        </div>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          {isAuth&&<form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>}
          <Profile />
        </div>
      </header>
      <section className="flex flex-col justify-center items-center p-4" >
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
