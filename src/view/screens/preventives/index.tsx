import React, { useEffect } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { PreventiveServiceOrderFilters } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";

export function Preventives(){

  useEffect(()=>{
    (async () => {
      const resp = await window.app.invoke<IResponseEntity<PreventiveServiceOrder[]>, PreventiveServiceOrderFilters >('getPrintedServiceOrders', {
        weekCode: '2024-W02'
      })

      console.log(resp)

    })()
  }, [])

  return (
    <ScreenContainer>

      <h2>Preventivas</h2>

    </ScreenContainer>
  )
}
