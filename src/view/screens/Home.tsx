import { User } from "@/domain/User/User";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home(){

  const navigate = useNavigate()
  const [user, setUser] = useState<User>()

  useEffect(()=>{
    (async () => {
      const a = await window.app.invoke<User, number>('getUserById', 1)
      console.log(a)
      setUser(a)
    })();
  }, [])

  return (
    <div>
      Home <br />
      <button onClick={() => navigate('/test')} >To test page</button>
      <div>{user?.firstName}</div> <br/>
    </div>
  )
}
