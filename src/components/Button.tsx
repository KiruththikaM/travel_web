import type { ElementType } from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  component?: ElementType | any;
  to?: string;
  pill?: boolean;
}



const Button = ({ children, sx = {}, pill, ...props }: ButtonProps) => {
  const isPrimary = props.variant === 'contained' && (props.color === 'primary' || !props.color);
  const isOutlined = props.variant === 'outlined';
  const isText = props.variant === 'text' || !props.variant;
  

  return (
    <MuiButton
      {...props}
      sx={{
        textTransform: 'none',
        fontWeight: (sx as any)?.fontWeight || 700,
        borderRadius: pill ? '50px' : 2,
        ...(isPrimary && {
          bgcolor: '#fb5b52',
          color: 'white',
          '&:hover': { bgcolor: '#e0453d' },
        }),
        ...(isOutlined && props.color !== 'error' && {
          borderColor: '#fb5b52',
          color: '#fb5b52',
          borderWidth: '2px',
          '&:hover': { bgcolor: '#fff1f0', borderColor: '#fb5b52', borderWidth: '2px' },
        }),
        ...(isText && props.color !== 'error' && !(sx as any)?.color && {
          color: '#fb5b52',
          '&:hover': { bgcolor: 'transparent', color: '#e0453d' },
        }),
        ...sx,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;


