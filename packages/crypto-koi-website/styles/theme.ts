import { extendTheme } from '@chakra-ui/react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'

export const colors = resolveConfig(tailwindConfig).theme.colors! as {
  [key: string]: string
}

export const theme = extendTheme({
  colors: {
    ...colors,
  },
})
