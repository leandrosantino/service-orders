import styled from 'styled-components'

export const Root = styled.table`
  width: 100%;
  font-size: 1.4rem;
  display: grid;
  grid-template-areas:
    "head"
    "body"
  ;

  grid-template-rows: 4rem auto;


  thead, tbody{
    tr{
      display: flex;
      width: 100%;

      td, th{
        display:flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        padding: .4rem;
      }
    }
  }

`
