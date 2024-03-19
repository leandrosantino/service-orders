import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { User, Settings, LogOut } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from "./ui/dropdown-menu"

export function Profile(){

  const navigate = useNavigate()

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="bg-zinc-200 " >
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-1">
          <DropdownMenuLabel>Sistema</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem >
            <LogOut className="mr-2 h-4 w-4 text-red-600" />
            <span className="text-red-600" >Sair</span>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
