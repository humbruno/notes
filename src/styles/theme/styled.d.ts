import {} from 'styled-components';
import { theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends theme {}
}
