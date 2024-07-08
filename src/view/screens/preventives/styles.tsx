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
  height: calc(100vh - 200px);
  overflow-x: auto;

  &>section {
    width: 100%;
    padding: .8rem;
    display: grid;
    grid-template-columns: 50fr 50fr;
    gap: 1.8rem;
  }

`

export const Card = styled.div<{isPrinted: boolean, isConcluded?: boolean}>`
  width: 100%;
  height: 17rem;
  /* border: 2px solid ${p=> p.theme.colors.dark.gray8}; */
  background-color:  ${p=> p.theme.colors.light.gray2};
  border-radius: .4rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0;

  &>div:nth-child(1){
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: .4rem .4rem 0 0;
    padding: .4rem;
    background-color: ${p => p.isPrinted?p.isConcluded?p.theme.colors.dark.green11:p.theme.colors.dark.blue11:p.theme.colors.dark.gray11};
    &>span{
      font-weight: 600;
    }
  }
  &>div:nth-child(2){
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: .8rem;
    justify-content: space-between;

    &>div{
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-weight: 500;
      &>span{
        font-weight: normal;
      }
    }

    div#buttons{
      width: 100%;
      display: flex;
      gap: .4rem;

      &>button{
        width: 100%;
        background-color: ${p => p.theme.colors.dark.gray7};
        color: ${p => p.theme.colors.dark.gray12};
        padding: .4rem;
        border-radius: .4rem;
      }
    }

  }


`
