import styled from 'styled-components'

export const Body = styled.tbody`
  font-size: 1.2rem;
  max-height: 45vh;
  grid-area: "body";
  overflow-y: auto;

  tr{
    border-bottom: 1px solid ${p => p.theme.colors.light.gray8};

    td button{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: .4rem;
      color: ${p => p.theme.colors.light.red11};
      font-weight: 600;
      &:hover{
        background-color: ${p => p.theme.colors.light.red4};
      }
    }

  }
`
