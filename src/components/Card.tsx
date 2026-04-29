import { Paper } from '@mui/material'
import type { PaperProps } from '@mui/material'
import type { Theme } from '@mui/material/styles'

interface GlassCardProps extends PaperProps {
  hover?: boolean
}

const glassSx = {
  background: (theme: Theme) =>
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: (theme: Theme) =>
    theme.palette.mode === 'dark'
      ? '1px solid rgba(255,255,255,0.08)'
      : '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  borderRadius: 4,
}

function Card({ hover = false, sx, children, ...props }: GlassCardProps) {
  return (
    <Paper
      elevation={0}
      {...props}
      sx={{
        ...glassSx,
        ...(hover && {
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          },
        }),
        ...sx,
      }}
    >
      {children}
    </Paper>
  )
}

export default Card
