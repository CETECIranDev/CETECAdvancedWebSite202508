// styles/theme.ts
import { createGlobalStyle, DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      cardBackground: string;
      borderColor: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    primary: '#0070f3',
    secondary: '#1a202c',
    background: '#ffffff',
    text: '#333333',
    cardBackground: '#f8f8f8',
    borderColor: '#e0e0e0',
  },
};

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    primary: '#90CAF9',
    secondary: '#bb86fc',
    background: '#121212',
    text: '#e0e0e0',
    cardBackground: '#1e1e1e',
    borderColor: '#333333',
  },
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Vazirmatn', sans-serif; // اضافه کردن فونت فارسی
    transition: all 0.3s ease-in-out;
    margin: 0;
    padding: 0;
    direction: ${({ i18n }: any) => (i18n?.language === 'fa' ? 'rtl' : 'ltr')};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  p {
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text};
  }
`;