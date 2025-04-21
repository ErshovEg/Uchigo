import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.isDarkMode ? '#1a1a1a' : '#ffffff'};
    color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
    transition: background-color 0.5s ease, color 0.5s ease;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }
`;

export default GlobalStyle; 