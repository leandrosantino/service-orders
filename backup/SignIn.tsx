import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ScreenContainer } from "../components/ScreenContainer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../components/ui/input'
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/view/components/ui/form"

const loginFormSchema = z.object({
  register: z.string().min(1),
  password: z.string().min(1)
})

type LoginFormType = z.infer<typeof loginFormSchema>

export function SignIn(){

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema)
  })

  const {
    handleSubmit,
    control,
  } = loginForm

  const {signIn} = useAuth()
  const navigate = useNavigate()

  async function onSubmit({password, register}: LoginFormType){
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
          <Form {...loginForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={control}
                name="register"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mátricula:</FormLabel>
                    <FormControl>
                      <Input placeholder="000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">Entrar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ScreenContainer>
  )
}


