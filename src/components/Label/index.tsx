import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

interface LabelProps {
  className?: string;
  tooltip?:string;
  color?:| 'primary'| 'black'| 'secondary'| 'error'| 'warning'| 'success'| 'info';
  children?: ReactNode;
}

const LabelWrapper = styled('span')(
  ({ theme }) => {
    return `
      background-color: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(0.5, 1)};
      font-size: ${theme.typography.pxToRem(13)};
      border-radius: ${theme.general.borderRadius};
      display: inline-flex;
      align-items: center;
      font-size: ${theme.typography.pxToRem(14)};
      justify-content: center;
      gap: ${theme.spacing(1)}; 
      // text-transform: capitalize;
      max-height: ${theme.spacing(3)};
      
      &.MuiLabel {
        &-primary {
          background-color: ${theme.colors.primary.lighter};
          color: ${theme.palette.primary.main}
        }
        &-black {
          background-color: ${theme.colors.alpha.black[100]};
          color: ${theme.colors.alpha.white[100]};
        }
        &-secondary {
          background-color: ${theme.colors.secondary.lighter};
          color: ${theme.palette.secondary.main}
        }
        &-success {
          background-color: ${theme.colors.success.lighter};
          color: ${theme.palette.success.main}
        }  
        &-warning {
          background-color: ${theme.colors.warning.lighter};
          color: ${theme.palette.warning.main}
        }       
        &-error {
          background-color: ${theme.colors.error.lighter};
          color: ${theme.palette.error.main}
        }
        &-info {
          background-color: ${theme.colors.info.lighter};
          color: ${theme.palette.info.main}
        }

        
      }
`
  }
);

const Label: FC<LabelProps> = ({className,color = 'secondary',tooltip='',children,...rest}) => {
  return (
    <Tooltip title={tooltip}>
      <LabelWrapper className={'MuiLabel-' + color} {...rest}>
        {children}
      </LabelWrapper>
    </Tooltip>
  );
};


export default Label;
