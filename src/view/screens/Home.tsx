import { IGetUserResponseDTO } from "@/domain/User/IGetUserResponseDTO";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home(){

  const navigate = useNavigate()
  const [user, setUser] = useState<IGetUserResponseDTO>()

  useEffect(()=>{
    (async () => {
      const a = await window.app.invoke<IGetUserResponseDTO, number>('getUserById', 1)
      console.log(a)
      setUser(a)
    })();
  }, [])

  return (
    <div>
      Home <br />
      <button>To test page</button>
      <div>{user?.firstName}</div> <br/>
    </div>
  )
}
