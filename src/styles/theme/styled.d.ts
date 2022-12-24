import {} from 'styled-components';
import theme from '../styles/theme/index';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}

export type ThemeType = {
  theme: typeof theme;
};
