import type { AppProps } from 'next/app';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import 'styles/global.css';
import light from 'styles/theme/light';
import dark from 'styles/theme/dark';

export default function App({ Component, ...pageProps }: AppProps) {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme === light ? dark : light);
    localStorage.setItem(
      'theme',
      JSON.stringify(theme === light ? 'dark' : 'light'),
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}
