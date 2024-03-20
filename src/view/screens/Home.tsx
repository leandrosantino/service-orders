import { IUserResponseDTO } from "@/domain/User/dto/IUserDTO";
import React, { useEffect, useState } from "react";

export function Home(){

  const [user, setUser] = useState<IUserResponseDTO[]>()

  useEffect(()=>{
    (async () => {
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
        <div key={_user.firstName}>
         <br/> <div>{_user.firstName} - {_user.lastName}</div>
        </div>
      ))}
    </div>
  )
}
