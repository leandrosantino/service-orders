import { type HTMLProps } from 'react'
import styled from 'styled-components'

interface HeadProps extends HTMLProps<HTMLTableRowElement> {}

export function Head (props: HeadProps) {
  return (
    <Thead>
      <tr {...props} />
    </Thead>
  )
}

const Thead = styled.thead`
  grid-area: "head";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${p => p.theme.colors.light.gray5};
`
