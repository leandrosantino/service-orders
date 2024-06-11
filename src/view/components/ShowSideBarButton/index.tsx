import React from 'react'
import styled from 'styled-components'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { FastOmit, IStyledComponentBase } from 'styled-components/dist/types'

const Button = styled.button`
  width: 3.2rem;
  aspect-ratio: 1/1;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: .4rem;
  &:hover, &:active{
    background-color: ${p => p.theme.colors.light.gray5}
  }

  @media(max-width: 1000px){
    display: flex;
  }

`

type ShowSideBarButtonProps = IStyledComponentBase<
  "web",
  FastOmit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, never>
>['defaultProps']

export function ShowSideBarButton (props: ShowSideBarButtonProps) {
  return (
    <Button {...props}>
      <HamburgerMenuIcon/>
    </Button>
  )
}
