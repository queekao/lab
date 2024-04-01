// import { ButtonProps } from '@mui/material'
export default function componentStyleOverrides(): any {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
          border: '1px solid #1976d2'
        }
      }
    }
  }
}
