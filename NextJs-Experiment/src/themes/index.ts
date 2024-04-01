import { enUS } from '@mui/material/locale'
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles'
import componentStyleOverrides from './compStyleOverride'

export const theme = (): Theme => {
  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    breakpoints: {
      values: {
        xl: 2000,
        lg: 1440,
        md: 960,
        sm: 760,
        xs: 480
      }
    },
    components: componentStyleOverrides()
  }

  const themes = createTheme(themeOptions, enUS)

  return themes
}
