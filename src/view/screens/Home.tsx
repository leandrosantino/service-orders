import { IUserResponseDTO } from "@/domain/User/dto/IUserDTO";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ScreenContainer } from "../components/ScreenContainer";

export function Home(){

  const auth = useAuth()
  const [user, setUser] = useState<IUserResponseDTO[]>()

  useEffect(()=>{
    (async () => {
      try{
        await auth.signIn(913,'123456789')
      }catch(err){
        console.log((err as Error).message)
      }

      console.log(auth.isAuth)
      console.log(auth.user)

      const a = await window.app.invoke<IUserResponseDTO[]>('getAllUsers')
      console.log(a)
      setUser(a)
    })();
  }, [])

  return (
    <ScreenContainer>
      Home <br />
      <button>To test page</button> <br/>
      {user?.map(_user => (
        <div key={_user.id}>
         <br/> <div>{_user.firstName} - {_user.lastName}</div>
        </div>
      ))}
    </ScreenContainer>
  )
}
