import React, { ReactNode } from "react";

export function ScreenContainer({children}:{children: ReactNode}){
  return (
    <div className="w-full h-full  max-w-[900px]" >
      {children}
    </div>
  )
}
