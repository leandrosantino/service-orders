import {
  Activity,
  DollarSign,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/view/components/ui/card"


import React from "react"
import { ScreenContainer } from "../components/ScreenContainer"

const cardsData = [
  {
    title: 'MTTR',
    description: 'Tempo médio para reparos',
    value: '30 min',
    Icon: DollarSign
  },
  {
    title: 'MTBF',
    description: 'Tempo médio entre falhas',
    value: '23,5 hrs',
    Icon: Activity
  },
  {
    title: 'Breakdowns',
    description: 'Total de falhas',
    value: '30',
    Icon: DollarSign
  },
  {
    title: 'Disponibilidade',
    description: 'Tempo útil do equipamento',
    value: '85%',
    Icon: DollarSign
  },

]

export function Home() {
  return (
    <ScreenContainer className="max-w-full max-h-full grid grid-rows-[174px_1fr]">
          {/* <div className="flex items-center py-6 px-2" >
            <h1 className="font-semibold text-2xl" >Dashboard</h1>
          </div> */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4 py-4">
            {cardsData.map(({title, description, value, Icon}) => (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between  pb-2">
                  <CardTitle className="text-lg font-medium">
                    {title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid w-full md:grid-cols-1 lg:grid-cols-[.25fr_.25fr_.50fr] gap-4">
            <Card className="">
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="text-lg font-semibold">MTTR / Tecnologia (min)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">

              </CardContent>
            </Card>
            <Card className="" >
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="text-lg font-semibold">MTBF / Tecnologia (min)</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">

              </CardContent>
            </Card>
            <Card className="" >
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="text-lg font-semibold">Top 10 - Breakdowns</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
              </CardContent>
            </Card>
          </div>

    </ScreenContainer>
  )
}
