const FONT_PRIMARY = 'Inter, sans-serif'

const typography = {
  fontFamily: FONT_PRIMARY,
  h1: {
    lineHeight: 1.2,
    fontSize: 32,
  },
  h2: {
    lineHeight: 1.2,
    fontSize: 20,
  },
  h3: {
    lineHeight: 1.5,
    fontSize: 16,
  },
  h4: {
    lineHeight: 1,
    fontSize: 12,
  },
  button: {
    textTransform: 'capitalize',
  },
} as const

export default typography