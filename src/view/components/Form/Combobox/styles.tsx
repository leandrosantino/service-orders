import styled from 'styled-components'
import { slideDownAndFade } from '../../../styles/global'

export const Content = styled.div`
  position: relative;
  z-index: 11;
`

export const BackContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`

export const Menu = styled.menu`
  position: absolute;
  left: .4rem;
  top: 0;
  margin-top: 4rem;
  min-width: 30rem;
  max-height: 20rem;
  overflow-x: auto;
  z-index: 11;

  padding: .8rem;
  border-radius: .4rem;
  background-color: ${p => p.theme.colors.light.gray1};
  box-shadow: 1px 0px 7px 0px rgba(0, 0, 0, 0.4);
  flex-direction: column;
  display: flex;
  gap: .4rem;

  animation-name: ${slideDownAndFade};
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  button{
    width: 100%;
    background-color: ${p => p.theme.colors.light.gray1};
    padding: .4rem;
    text-align: start;
    border-radius: .4rem;

    &:hover{
      background-color: rgba(0, 0, 0, .08);
    }


  }

`
