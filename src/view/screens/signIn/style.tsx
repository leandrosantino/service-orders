import styled from 'styled-components'
import * as RadixForm from '@radix-ui/react-form'

export const Container = styled.div`
  position: fixed;
  margin: auto;
  inset: 0;
  width: 35rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1.6rem 0;
  border-radius: 1.2rem;
  gap: 1.2rem;
  padding: .8rem;

  box-shadow: 1px 2px 12px 0px rgba(0,0,0,.4);


  h3{
    color: ${p => p.theme.colors.dark.blue4};
    border-bottom: 1px solid rgba(0,0,0, .2);
    font-size: 2.8rem;
    font-weight: 500;
    text-align: start;
    width: 100%;
    padding: .8rem;
  }

`

export const FormRoot = styled(RadixForm.Root)`
  width: 100%;
  padding: .8rem;
  gap: .4rem;
  display: flex;
  flex-direction: column;

  button{
    width: 100%;
    padding: .8rem;
    border-radius: .4rem;
    background-color: ${p => p.theme.colors.dark.blue4};
    color: ${p => p.theme.colors.dark.gray12};
    margin-top: 1.2rem;
    font-weight: 400;
    font-size: 1.4rem;

    &:hover{
      opacity: .9;
    }

  }
`

export const FormField = styled(RadixForm.Field)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: .4rem;

  div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    label{
      font-weight: 500;
      color: ${p => p.theme.colors.dark.gray5};
    }

    span{
      font-size: 1.2rem;
      color: ${p => p.theme.colors.light.red11};
    }

  }

  input{
    width: 100%;
    tab-size: 0;
    font-size: 1.6rem;
    padding: .8rem;
    background-color: rgba(0,0,0,.1);
    border-radius: .4rem;
    text-indent: .4rem;

    &[data-invalid]{
      border: 1px solid ${p => p.theme.colors.light.red11};

    }
  }

`
