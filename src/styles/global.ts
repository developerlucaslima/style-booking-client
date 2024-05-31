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