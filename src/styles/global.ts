import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
  }

  body {
    background-color: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }

  h1 {
    margin: 2rem 0; /* 20px */
    font-size: 2.25rem; /* 4xl: 36px */
    font-weight: 800;  /* extrabold */
    letter-spacing: -0.02em; /* tracking-tight */
  
    @media (min-width: 102.4rem) { /* lg: 1024px */
      font-size: 3rem; /* 5xl: 48px */
    }
  }

  h2 {
    margin-top: 2rem; /* 20px */
    margin-bottom: 0;
    padding-bottom: 0.2rem; /* 2px */
    font-size: 2rem; /* 3xl: 32px */
    font-weight: 600; /* font-semibold */
    letter-spacing: -0.02em; /* tracking-tight */
    border-bottom: 1px solid; /* border-b */
  
    &:first-of-type {
      margin-top: 0;
    }
  }
`;


// body {
//   background: ${({ theme }) => theme["gray-100"]};
//   color: ${({ theme }) => theme["gray-800"]};
//   font-family: ${({ theme }) => theme["font-family"]};
//   font-size: ${({ theme }) => theme["font-size"]};
//   line-height: ${({ theme }) => theme["line-height"]};
//   font-weight: ${({ theme }) => theme["font-weight"]};
//   text-rendering: optimizeLegibility;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }
