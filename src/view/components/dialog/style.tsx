import styled from 'styled-components'

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 0;
  background-color: rgba(0, 0, 0, .15);
  display: flex;
  justify-content: center;
  align-items: center;

`

export const Content = styled.div<{ error: boolean }>`
  width: 350px;
  height: fit-content;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 15px 0;
  display: flex;
  flex-direction: column;
  padding: 12px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  gap: 12px;

  color: ${p => p.theme.colors.dark.gray5};

  h4{
    font-size: 20px;
    width: 100%;
    height: 25%;

  }

  p{
    font-size: 14px;
    width: 100%;
    height: 50%;
    padding: 4px 0px;
  }

  form{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  div{
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;

    button{
      /* border-radius: 4px;
      padding: 4px 8px;
      border: none;
      color: #fff; */

      &:first-child{
        background-color: ${p => p.theme.colors.dark.gray11};
        &:hover{
          background-color: ${p => p.theme.colors.dark.gray10};
        }
      }
      &:last-child{
        background-color: ${({ error }) => error ? 'red' : ''};
      }

      &:hover{
        opacity: .9;
      }

    }

  }


`

export const PromptInput = styled.input<{ error: boolean }>`
  width: 100%;
  border: 1px solid ${({ error }) => error ? 'red' : 'black'};
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
`
