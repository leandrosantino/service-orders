import React, { useEffect } from "react";
import { ScreenContainer } from "@/view/components/containers/ScreenContainer";


export function Preventives(){

  useEffect(()=>{
    (async () => {
      const resp = await window.app.invoke.getPrintedServiceOrders({
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
