import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme/styled';

const GlobalStyle = createGlobalStyle<ThemeType>`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  body {
    font-family: ${({ theme }) => theme.font};
}
`;

export default GlobalStyle;
