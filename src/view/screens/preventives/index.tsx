import React, { useState } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { DateTime } from "@/utils/DateTime";
import { api } from "@/view/query";



export function Preventives(){

  const [week, setWeek] = useState('')

  const query = api.preventiveServiceOrderService.getPrintedServiceOrders.query({
    weekCode: week == ''?undefined:week
  })

  const mutation = api.preventiveServiceOrderService.executeServiceOrders.mutation()
  const mutation2 = api.preventiveServiceOrderService.printServiceOrder.mutation()

  return (
    <ScreenContainer>

      <h2>Preventivas</h2>

      <button
        onClick={() => {
          mutation.mutate({
            printedServiceOrderId: 3,
            data: {
              date: new DateTime(),
              durationInMinutes: 12,
              responsibles: [1]
            }
          })
        }}
      >
        Teste
      </button>
      <button
        onClick={() => {
          mutation2.mutate({plannedServiceOrderId: 2})
        }}
      >
        Teste2
      </button>
      <span>{week}</span>
      <span>{mutation.isError && mutation.error.message}</span>
      <span>{query.isFetching && 'Feting'}</span>

      <input type="week" onChange={(e) => {console.log('sdf');setWeek(e.target.value)}} value={week} />

      {query.data?.data?.map(({id} ) => (
        <div>{id}</div>
      ))}



    </ScreenContainer>
  )
}
