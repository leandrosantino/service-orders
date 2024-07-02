import React, { useEffect } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "@/utils/DateTime";
import { getPlannedServiceOrders } from "@/view/query";


export function Preventives(){

  const queryClient = useQueryClient()

  const query = getPlannedServiceOrders({
    weekCode: '2024-W02'
  })

  return (
    <ScreenContainer>

      <h2>Preventivas</h2>

      {query.data?.data?.map(({id} ) => (
        <div>{id}</div>
      ))}



    </ScreenContainer>
  )
}
