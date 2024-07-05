import React, { useState } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { DateTime } from "@/utils/DateTime";
import { api } from "@/view/query";
import { Card, CardsContainer, Content } from "./styles";
import { PreventiveServiceOrderState } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrderState";

export function Preventives(){

  const plannedServiceOrders = api.preventiveServiceOrderService.getPlannedServiceOrders.query({
    weekCode: '2024-W02'
  })
  const printedServiceOrders = api.preventiveServiceOrderService.getPrintedServiceOrders.query({
    weekCode: '2024-W01'
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


      <header></header>


      <Content>
        <CardsContainer>
          <section>
            {plannedServiceOrders.data?.map(({id, state, nextExecution}) => (
              <Card isPrinted={state == PreventiveServiceOrderState.PRINTED} >
                {id} <br/>
                {String(nextExecution)}
                <button onClick={() => handlePrint(id)}>Imprimir</button>
              </Card>
            ))}
          </section>
        </CardsContainer>
        <CardsContainer>
          <section>
            {printedServiceOrders.data?.map(({id, concluded}) => (
              <Card isPrinted={true} >
                {id}
                <button onClick={() => handlePrint(id)} >Imprimir</button>
                {
                  !concluded&&
                  <button onClick={() => handleExecute(id)} >Executar</button>
                }
              </Card>
            ))}
          </section>
        </CardsContainer>

      </Content>



    </ScreenContainer>
  )
}
