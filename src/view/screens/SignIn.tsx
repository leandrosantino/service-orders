import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ScreenContainer } from "../components/ScreenContainer";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

import { Input } from '../components/ui/input'

export function SignIn(){

  const {signIn} = useAuth()
  const navigate = useNavigate()

  const [register, setRegister] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn(){
    try{
      await signIn(Number(register), password)
    }catch(err){
      console.log((err as Error).message)
    }
    navigate('/')
  }

  return (
    <ScreenContainer className="flex justify-center items-center" >
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Insira sua matricula e senha para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Matrícula:</Label>
                <Input
                  id="name"
                  placeholder="000"
                  value={register}
                  onChange={(e) => setRegister(e.target.value)}
                  />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha:</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full" onClick={handleSignIn} >Entrar</Button>
        </CardFooter>
      </Card>
    </ScreenContainer>
  )
}


