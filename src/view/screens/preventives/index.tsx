import React, { useState } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { DateTime } from "@/utils/DateTime";
import { api } from "@/view/query";
import { Card, CardsContainer, Content } from "./styles";
import { PreventiveServiceOrderState } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrderState";

export function Preventives(){

  const plannedServiceOrders = api.preventiveServiceOrderService.getPlannedServiceOrders.query({})
  const printedServiceOrders = api.preventiveServiceOrderService.getPrintedServiceOrders.query({})


  const printServiceOrder = api.preventiveServiceOrderService.printServiceOrder.mutation()
  const executeServiceOrder = api.preventiveServiceOrderService.executeServiceOrders.mutation()

  function handlePrint(id: number){
    printServiceOrder.mutateAsync({plannedServiceOrderId: id}).then(() => {
      plannedServiceOrders.refetch()
      printedServiceOrders.refetch()
    })
  }

  function handleExecute(id: number){
    executeServiceOrder.mutateAsync({
      printedServiceOrderId: id,
      data: {
        date: new DateTime(),
        durationInMinutes: 15,
        responsibles: [1, 2]
      }
    }).then(() => {
      plannedServiceOrders.refetch()
      printedServiceOrders.refetch()
    })
  }

  return (
    <ScreenContainer>

      <h2>Preventivas</h2>


      <header></header>


      <Content>
        <CardsContainer>
          <section>
            {plannedServiceOrders.data?.map(({id, state, }) => (
              <Card isPrinted={state == PreventiveServiceOrderState.PRINTED} >
                {id}
                <button onClick={() => handlePrint(id)}>Imprimir</button>
                {
                  state == PreventiveServiceOrderState.PRINTED&&
                  <button onClick={() => handleExecute(id)} >Executar</button>
                }
              </Card>
            ))}
          </section>
        </CardsContainer>
        <CardsContainer>
          <section>
            {printedServiceOrders.data?.map(({id}) => (
              <Card isPrinted={true} >
                {id}
                <button onClick={() => handlePrint(id)} >Imprimir</button>
              </Card>
            ))}
          </section>
        </CardsContainer>

      </Content>



    </ScreenContainer>
  )
}
