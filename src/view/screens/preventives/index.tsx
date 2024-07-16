import React, { useState } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { DateTime } from "@/utils/DateTime";
import { api } from "@/view/query";
import { Content, ListTitle } from "./styles";
import { PreventiveServiceOrderState } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrderState";
import { Card, CardsContainer } from "@/view/components/Card";
import { Turn } from "@/domain/entities/ServiceOrder/Turn";

export function Preventives(){

  const [week, setWeek] = useState('2024-W26')

  const plannedServiceOrders = api.preventiveServiceOrderService.getPlannedServiceOrders.query({
    weekCode: week == ''?undefined: week
  })
  const printedServiceOrders = api.preventiveServiceOrderService.getPrintedServiceOrders.query({
    weekCode: week
  })

  const executeServiceOrder = api.preventiveServiceOrderService.executeServiceOrders.mutation()

  async function handleExecute(id: number){
    await executeServiceOrder.mutateAsync({
      printedServiceOrderId: id,
      data: {
        date: new DateTime(),
        durationInMinutes: 15,
        comments: 'O item 1245 não foi realizado por falta de componentes',
        turn: Turn.T1,
        responsibles: [1, 2]
      }
    })
    await plannedServiceOrders.refetch()
    await printedServiceOrders.refetch()
  }

  function handleDetails(id: number, isPrinted?: boolean){
    window.app.ipc('showServiceOrderDetails', id, isPrinted).then(async () => {
      await plannedServiceOrders.refetch()
      await printedServiceOrders.refetch()
    })
  }

  return (
    <ScreenContainer>

      <h1>Preventivas</h1>

      <header>
        <label htmlFor="week">Semana: </label>
        <input type="week" id='week' onChange={(e) => setWeek(e.target.value)} value={week}/>
      </header>

      <Content>
        <ListTitle>
          <h2>Planejadas</h2>
        </ListTitle>
        <ListTitle>
          <h2>Impressas</h2>
        </ListTitle>
        <CardsContainer>
          <section>
            {plannedServiceOrders.data?.map(({id, state, nextExecution, frequencyInWeeks, machine:{tag}, nature }) => (
              <Card key={id} isPrinted={state == PreventiveServiceOrderState.PRINTED} onClick={() => handleDetails(id)} >
                <div>
                  <span>ID {id}</span>
                  <span>{tag.length > 15?tag.substring(0, 15).concat('...'):tag}</span>
                </div>
                <div>
                  <div>Natureza: <span>{nature}</span></div>
                  <div>Semana: <span>{new DateTime(String(nextExecution)).toWeekOfYearString()}</span></div>
                  <div>Frequencia: <span>{frequencyInWeeks} sem</span></div>
                  <div>Status: <span id='status' >Planejada</span></div>
                </div>
              </Card>
            ))}
          </section>
        </CardsContainer>
        <CardsContainer>
          <section>
            {printedServiceOrders.data?.map(({
              id, concluded, weekCode,
              preventiveServiceOrder:{ machine:{tag}, nature, frequencyInWeeks, ...prevSO },
              serviceOrder
            }) => (
              <Card key={id} isPrinted={true} isConcluded={concluded} >
                <div onClick={() => handleDetails(id, true)}>
                  <span>ID {prevSO.id}</span>
                  <span>{tag.length > 14?tag.substring(0, 14).concat('...'):tag}</span>
                </div>
                <div onClick={() => handleDetails(id, true)} >
                  <div>Código: <span>{id.toString().padStart(5, '0')}</span></div>
                  <div>Semana: <span>{weekCode}</span></div>
                  <div>Natureza: <span>{nature}</span></div>
                  {concluded&&<div>Data: <span>{new DateTime(String(serviceOrder?.date)).toLocaleDateString()}</span></div>}
                  <div>Status: <span id='status' >{concluded?'Concluída':'Impressa'}</span></div>
                </div>
                {!concluded&&<div>
                  <button id='btnExecute' onClick={() => handleExecute(id)} >Fechar OS</button>
                </div>}
              </Card>
            ))}
          </section>
        </CardsContainer>

      </Content>



    </ScreenContainer>
  )
}
