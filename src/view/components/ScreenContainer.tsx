import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function ScreenContainer({children, className}:{children: ReactNode,className?: string}){
  return (
    <div className={twMerge('w-full h-full max-w-[900px]', className)} >
      {children}
    </div>
  )
}
