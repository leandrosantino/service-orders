import React from "react";
import { useNavigate } from "react-router-dom";

export function Test(){

  const navigate = useNavigate()

  return (
    <div>
      Test <br />
      <button onClick={() => navigate('/')} >To home page</button>
    </div>
  )
}
