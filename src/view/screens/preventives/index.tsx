import React, { useState } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { DateTime } from "@/utils/DateTime";
import { api } from "@/view/query";
import { Content, FiltersMenu, ListTitle } from "./styles";
import { PreventiveServiceOrderState } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrderState";
import { Card, CardsContainer } from "@/view/components/Card";
import { Turn } from "@/domain/entities/ServiceOrder/Turn";
import { Worker } from "@/domain/entities/Worker/Worker";
import { Specialty } from "@/domain/entities/Worker/Specialty";

export function Preventives(){

  const [week, setWeek] = useState(new DateTime().toWeekOfYearString())
  const [machine, setMachine] = useState('')
  const [nature, setNature] = useState('')

  const plannedServiceOrders = api.preventiveServiceOrderService.getPlannedServiceOrders.query({
    weekCode: week == ''?undefined: week,
    machineId: machine == ''?undefined:Number(machine),
    nature: (nature == ''?undefined:nature) as Specialty
  })
  const printedServiceOrders = api.preventiveServiceOrderService.getPrintedServiceOrders.query({
    weekCode: week,
    machineId: machine == ''?undefined:Number(machine),
    nature: (nature == ''?undefined:nature) as Specialty
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

      <FiltersMenu>
        <span>Filtros: </span>
        <div>
          <input type="week" onChange={(e) => setWeek(e.target.value)} value={week}/>
          <select value={machine} onChange={e => setMachine(e.target.value)}>
            <option value="" selected > ------------------ </option>
            <option value="1">M01</option>
            <option value="2">M02</option>
            <option value="3">M03</option>
            <option value="4">M04</option>
          </select>
          <select value={nature} onChange={e => setNature(e.target.value)}>
            <option value="" selected > ------------------ </option>
            <option value={Specialty.ELECTRICAL} selected > {Specialty.ELECTRICAL} </option>
            <option value={Specialty.MECHANICS} selected > {Specialty.MECHANICS} </option>
          </select>
        </div>
      </FiltersMenu>

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
