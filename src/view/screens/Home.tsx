import { IUserAuthRequestDTO } from "@/domain/User/dto/IUserAuthDTO";
import { IUserResponseDTO } from "@/domain/User/dto/IUserDTO";
import React, { useEffect, useState } from "react";

export function Home(){

  const [user, setUser] = useState<IUserResponseDTO[]>()

  useEffect(()=>{
    (async () => {
      console.log(await window.app.invoke<IUserResponseDTO, IUserAuthRequestDTO>('auth', {
        password: '123456789',
        register: 91
      }))
      const a = await window.app.invoke<IUserResponseDTO[]>('getAllUsers')
      console.log(a)
      setUser(a)
    })();
  }, [])

  return (
    <div>
      Home <br />
      <button>To test page</button> <br/>
      {user?.map(_user => (
        <div key={_user.id}>
         <br/> <div>{_user.firstName} - {_user.lastName}</div>
        </div>
      ))}
    </div>
  )
}
