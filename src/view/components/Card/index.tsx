import styled from "styled-components";

export const CardsContainer = styled.div`
  width: 100%;
  height: calc(100vh - 260px);
  overflow-x: auto;

  &>section {
    width: 100%;
    padding: .8rem;
    display: grid;
    grid-template-columns: 50fr 50fr;
    padding-top: 2rem;
    gap: 1.8rem;
  }

`

export const Card = styled.div<{isPrinted: boolean, isConcluded?: boolean}>`
  width: 100%;
  height: ${p => p.isPrinted?'20rem':'17rem'};
  /* border: 2px solid ${p=> p.theme.colors.dark.gray8}; */
  background-color:  ${p=> p.theme.colors.light.gray2};
  border-radius: .8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 10px 0;
  cursor: pointer;

  &:hover{
    background-color: rgb(0,0,0,.08);
    &>div:first-child{
      opacity: 0.95;
    }
  }

  &>div:nth-child(1){
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-radius: .8rem .8rem 0 0;
    padding: .8rem;
    background-color: ${p => p.isPrinted?p.isConcluded?p.theme.colors.dark.green11:p.theme.colors.dark.blue11:p.theme.colors.dark.yellow11};
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

      &>span#status{
        font-weight: 600;
        ${p => p.isConcluded&&`color: ${p.theme.colors.dark.green11}`}
      }

    }



  }

  &>div:nth-child(3){
    width: 100%;
    padding: 0 .8rem .8rem .8rem;
  }


  button{
    width: 100%;
    background-color: ${p => p.theme.colors.dark.gray7};
    color: ${p => p.theme.colors.dark.gray12};
    padding: .4rem;
    border-radius: .4rem;
    font-weight: 600;
  }

  button#btnExecute{
    color: ${p => p.theme.colors.dark.gray1};
    background-color: ${p => p.theme.colors.dark.blue11};
  }


`
