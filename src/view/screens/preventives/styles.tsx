import styled from "styled-components";

export const Content = styled.div`

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 50fr 50fr;
  grid-template-rows: 3.5rem auto;
  /* align-items: start; */
  justify-content: start;
  column-gap: 1.2rem;

`
export const ListTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
  h2{
    font-weight: 500;
    font-size: 2rem;
  }
  border: 2px solid ${p => p.theme.colors.dark.gray5};
  border-radius: .8rem;
`
export const FiltersMenu = styled.menu`

  padding: 1.2rem 0;
  display: flex;
  gap: 1.2rem;
  align-items: center;

  span{
    font-size: 1.8rem;
    font-weight: 500;
  }

  div{
    display: flex;
    gap: 1.2rem;
  }
  input, select{
    font-size: 1.4rem;
    padding: .4rem;
    border: 1px solid ${p => p.theme.colors.dark.gray5};
    border-radius: .4rem;
  }

`
