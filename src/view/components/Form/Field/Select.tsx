import { type ReactNode, type HTMLProps } from 'react'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  name: string
  icon?: ReactNode
}

export function Select ({ icon, ...rest }: SelectProps) {
  const { register } = useFormContext()

  return (
    <Container >
      <select {...rest} {...register(rest.name)}/>
    </Container>
  )
}

const Container = styled.div`
  color: ${p => p.theme.colors.dark.gray5};

  select{
    width: 100%;
    tab-size: 0;
    border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
    font-size: 1.4rem;
    padding: .6rem;
    border-radius: .4rem;
    text-indent: .4rem;
    &::-webkit-input-placeholder{
      font-size: 1.2rem;
    }
  }

`

// const a = () => <Input name='s' icon={<svg></svg>} ></Input>
