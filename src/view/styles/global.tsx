import { createGlobalStyle, keyframes } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  :root{
    --shadow : 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%
  }

  @media(max-width: 720px) {
    html {
      font-size: 55%
    }
  }

  button {
    transition: all .2s linear;
  }
  input,
  textarea,
  select,
  button{
    background-color: transparent;
    border: none;
  }


  body,
  input,
  textarea,
  select,
  button {
    font: 400 1.2rem 'Poppins', sans-serif;
    color: ${p => p.theme.colors.dark.gray5};
  }

  *::-webkit-scrollbar {
    width: .6rem;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    width: .1rem;
    border-radius: .3rem;
    background-color: ${p => p.theme.colors.light.gray10};
  }

  button {
    cursor: pointer
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`

export const slideDownAndFade = keyframes`
from {
  opacity: 0;
  transform: translateY(-2px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`
