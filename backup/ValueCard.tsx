import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

export function ValueCard({children, description, title, icon: Icon}:{title?: string, description?: string, children?: ReactNode, icon: LucideIcon}){
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between  pb-2">
        <CardTitle className="text-lg font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {children}
        </div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
