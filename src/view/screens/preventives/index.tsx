import React, { useState } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { DateTime } from "@/utils/DateTime";
import { api } from "@/view/query";
import { Card, CardsContainer, Content } from "./styles";
import { PreventiveServiceOrderState } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrderState";

export function Preventives(){

  const [week, setWeek] = useState('2024-W26')

  const plannedServiceOrders = api.preventiveServiceOrderService.getPlannedServiceOrders.query({
    weekCode: week == ''?undefined: week
  })
  const printedServiceOrders = api.preventiveServiceOrderService.getPrintedServiceOrders.query({
    weekCode: week
  })


  const printServiceOrder = api.preventiveServiceOrderService.printServiceOrder.mutation()
  const executeServiceOrder = api.preventiveServiceOrderService.executeServiceOrders.mutation()

  async function handlePrint(id: number){
    await printServiceOrder.mutateAsync({plannedServiceOrderId: id})
    await plannedServiceOrders.refetch()
    await printedServiceOrders.refetch()
  }

  async function handleExecute(id: number){
    await executeServiceOrder.mutateAsync({
      printedServiceOrderId: id,
      data: {
        date: new DateTime(),
        durationInMinutes: 15,
        responsibles: [1, 2]
      }
    })
    await plannedServiceOrders.refetch()
    await printedServiceOrders.refetch()
  }

  return (
    <ScreenContainer>

      <h2>Preventivas</h2>


      <header>
        <label htmlFor="week">Semana: </label>
        <input type="week" id='week' onChange={(e) => setWeek(e.target.value)} value={week}/>
        <div>
          Quantidade: {plannedServiceOrders.data?.length + printedServiceOrders.data?.length}
        </div>
      </header>


      <Content>
        <CardsContainer>
          <section>
            {plannedServiceOrders.data?.map(({id, state, nextExecution, frequencyInWeeks, machine:{tag}, nature }) => (
              <Card isPrinted={state == PreventiveServiceOrderState.PRINTED} >
                <div>
                  <span>{tag.length > 15?tag.substring(0, 15).concat('...'):tag}</span>
                  <span>ID: {id}</span>
                </div>
                <div>
                  <div>Semana: <span>{new DateTime(String(nextExecution)).toWeekOfYearString()}</span></div>
                  <div>Frequencia: <span>{frequencyInWeeks}</span></div>
                  <div>Natureza: <span>{nature}</span></div>
                  <div id='buttons'>
                    <button onClick={() => handlePrint(id)}>Imprimir</button>
                  </div>
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
              <Card isPrinted={true} isConcluded={concluded} >
                <div>
                  <span>{tag.length > 14?tag.substring(0, 14).concat('...'):tag}</span>
                  <span>{id.toString().padStart(5, '0')}</span>
                </div>
                <div>
                  <div>Semana: <span>{weekCode}</span></div>
                  <div>Natureza: <span>{nature}</span></div>
                  {concluded&&<div>Data: <span>{new DateTime(String(serviceOrder?.date)).toLocaleDateString()}</span></div>}
                  <div id='buttons'>
                    {!concluded&&<button onClick={() => handleExecute(id)} >Executar</button>}
                    <button onClick={() => handlePrint(prevSO.id)} >Imprimir</button>
                  </div>
                </div>
              </Card>
            ))}
          </section>
        </CardsContainer>

      </Content>



    </ScreenContainer>
  )
}
