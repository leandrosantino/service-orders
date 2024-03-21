import { useLocation, useNavigate } from "react-router-dom"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./ui/menubar";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { useAuth } from "../hooks/useAuth";
import { getScreensProps, ScreensProps } from "../routes";


export function Navbar(){

  const auth = useAuth()
  const navigate = useNavigate()
  const {pathname} = useLocation()

  const menuBarTriggerStyle = (selected:boolean) => twMerge(
    navigationMenuTriggerStyle(),
    "font-medium cursor-pointer text-sm p-2 text-zinc-400 flex gap-4 hover:font-semibold rounded-xl",
    selected&& 'text-zinc-800 font-semibold'
  )
  const [screens, setScreens] = useState<ScreensProps[]>([])

  useEffect(() => {
    console.log(auth.user)
    setScreens(getScreensProps(auth.user?.roule))
  }, [auth.user])

  return (
    <Menubar>
      {screens.filter(({show}) => show).map(({name, path, subPaths}) => {
        if(subPaths) {
          return (
            <MenubarMenu key={name} >
              <MenubarTrigger className={menuBarTriggerStyle(pathname.startsWith(path))} >{name}</MenubarTrigger>
              <MenubarContent >
                {subPaths.filter(({show}) => show).map((subPath) => (
                  <MenubarItem
                    key={subPath.name}
                    className={twMerge(
                      "rounded hover:!bg-zinc-200 cursor-pointer",
                      pathname.split('/').includes(subPath.path.replace('/', ''))&&
                        'text-zinc-800 font-semibold'
                    )}
                    onClick={() => navigate(path + subPath.path)}
                  >
                    {subPath.name}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          )
        }
        return (
          <MenubarMenu  key={name} >
            <MenubarTrigger onClick={() => navigate(path)} className={menuBarTriggerStyle(pathname === path)}>
              {name}
            </MenubarTrigger>
          </MenubarMenu>
        )
      })}
    </Menubar>
  )
}
