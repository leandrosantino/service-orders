import styled from 'styled-components'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

export const Aside = styled.aside`
  background-color: ${p => p.theme.colors.dark.blue4};
  color: ${p => p.theme.colors.dark.gray12};

  header{
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid rgba(255,255,255,.1);
    padding: 2rem;

    button{
      color: ${p => p.theme.colors.dark.gray12};
      &:hover{
        background-color: rgba(255,255,255,.06);
      }
    }

    h2{
      font-size: 2.4rem;
      font-weight: 500;
      span{
        color: ${p => p.theme.colors.dark.blue11};
      }
    }
  }

  transition: transform 100ms;
  transform: translateX(0);

  &[data-show='off']{
    transform: translateX(-30rem);
  }

  @media(max-width: 1000px){
    position: absolute;
    height: 100vh;
    z-index: 101;
    width: 30rem;
    box-shadow: 1px 2px 12px 0px rgba(0,0,0,.4);

    header{
      padding-left: .5rem;
    }

  }

`

export const AbsoluteContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 100;

`

export const ToggleGroupRoot = styled(ToggleGroup.Root)`
  margin-top: 1.6rem;
  gap: .4rem;
  width: 100%;
  padding: .8rem;
  display: flex;
  flex-direction: column;
`

export const ToggleGroupItem = styled(ToggleGroup.Item)`
  background-color: transparent;
  color: ${p => p.theme.colors.dark.gray12};
  display: flex;
  justify-content: start;
  border-radius: .8rem;
  padding: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  border: none;

  &[data-state="on"]{
    background-color: rgba(255,255,255,.15);

  }

  &[data-state="off"]{
    &:hover{
      background-color: rgba(255,255,255,.06);
    }
  }
`
