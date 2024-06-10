import styled from 'styled-components'
import * as RadixSwitch from '@radix-ui/react-switch'

export const SwitchRoot = styled(RadixSwitch.Root)`
  width: 3.6rem;
  height: 2rem;
  border-radius: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${p => p.theme.colors.light.gray6};
  &[data-state='checked'] {
    background-color: ${p => p.theme.colors.light.blue6};
  }
`

export const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.light.gray10};
  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 100ms;
  transform: translateX(.4rem);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(1.8rem);
    background-color: ${p => p.theme.colors.dark.blue4};
  }

`
