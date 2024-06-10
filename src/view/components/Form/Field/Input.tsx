import { type ReactNode, type HTMLProps } from 'react'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'

interface InputProps extends HTMLProps<HTMLInputElement> {
  name: string
  icon?: ReactNode
}

export function Input ({ icon, ...rest }: InputProps) {
  const { register } = useFormContext()

  return (
    <Container data-icon={icon ? 'on' : 'off'} >
      <input {...rest} {...register(rest.name)}/>
      {icon}
    </Container>
  )
}

const Container = styled.div`
  color: ${p => p.theme.colors.dark.gray5};

  input{
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

    &:disabled{
      background-color: ${p => p.theme.colors.light.gray4};
    }

  }

  &[data-invalid='true']{
    input{
      border: 1px solid ${p => p.theme.colors.light.red11};
    }
  }

  &[data-icon='on']{
    svg{
      width: 2rem;
      height: 2rem;
      position: absolute;
      right: .8rem;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    button{

    }
    button.close{
      width: 2rem;
      height: 2rem;
      position: absolute;
      right: .8rem;
      top: .7rem;
      display: flex;
      justify-content: center;
      align-items: center;

      svg{
        position: inherit;
        width: 2rem;
        height: 2rem;
        margin: none;
        inset: 0;
      }

      &:hover{
        color: ${p => p.theme.colors.light.red11};
      }

    }



    input{
      padding-right: 3.2rem;
      text-overflow: ellipsis;
    }

  }
`

// const a = () => <Input name='s' icon={<svg></svg>} ></Input>
