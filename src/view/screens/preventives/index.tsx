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
            {plannedServiceOrders.data?.map(({id, state, nextExecution, frequencyInWeeks}) => (
              <Card isPrinted={state == PreventiveServiceOrderState.PRINTED} >
                {id} <br/>
                {new DateTime(String(nextExecution)).toLocaleString()}<br/>
                {new DateTime(String(nextExecution)).toWeekOfYearString()}<br/>
                {frequencyInWeeks}
                <button onClick={() => handlePrint(id)}>Imprimir</button>
              </Card>
            ))}
          </section>
        </CardsContainer>
        <CardsContainer>
          <section>
            {printedServiceOrders.data?.map(({id, concluded, preventiveServiceOrder, weekCode}) => (
              <Card isPrinted={true} >
                Code: {id.toString().padStart(5, '0')} <br/>
                <button onClick={() => handlePrint(id)} >Imprimir</button>
                {
                  !concluded&&
                  <button onClick={() => handleExecute(preventiveServiceOrder.id)} >Executar</button>
                }
              </Card>
            ))}
          </section>
        </CardsContainer>

      </Content>



    </ScreenContainer>
  )
}
