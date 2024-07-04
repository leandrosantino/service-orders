import styled from "styled-components";

export const Content = styled.div`

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 50fr 50fr;
  /* align-items: start; */
  justify-content: start;
  column-gap: 1.2rem;

`

export const CardsContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  overflow-x: auto;

  &>section {
    width: 100%;
    padding: .8rem;
    display: grid;
    grid-template-columns: 50fr 50fr;
    gap: .8rem;
  }

`

export const Card = styled.div<{isPrinted: boolean}>`
  width: 100%;
  height: 15rem;
  ${p => p.isPrinted
    ?'border: 2px solid blue;'
    :'border: 2px solid red;'
  }
  border-radius: .4rem;
  padding: .4rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;

  &>button{
    background-color: gray;
    padding: .4rem;
    border-radius: .4rem;
  }

`
