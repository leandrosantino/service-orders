import { ImSpinner6 } from 'react-icons/im'
import styled from 'styled-components'

export function Loading ({ show, message }: { show: boolean, message: string }) {
  if (!show) return <span></span>

  return (
    <SpinnerCase>
      <ImSpinner6 size={20}/>
      {message}
    </SpinnerCase>
  )
}

const SpinnerCase = styled.span`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .8rem;
  color: ${p => p.theme.colors.light.gray10};
  font-size: 1.4rem;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }
  svg{
    animation: rotate 3s linear infinite;
  }


`
