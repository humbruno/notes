import 'styled-components';
import theme from './index';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        rose: string;
        white: string;
        midnight: string;
        creamWhite: string;
      };
      semantic: {
        red: string;
        green: string;
      };
      post: {
        lightYellow: string;
        redOrange: string;
        lilac: string;
        greenCyan: string;
        lightCyan: string;
      };
      grays: {
        gray900: string;
        gray800: string;
        gray600: string;
        gray400: string;
        gray300: string;
      };
    };
    fontWeights: {
      regular: string;
      medium: string;
      bold: string;
    };
  }
}
