import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

interface LabelProps {
  className?: string;
  tooltip?:string;
  color?:| 'primary'| 'black'| 'secondary'| 'error'| 'warning'| 'success'| 'info';
  children?: ReactNode;
  fontSize?: number; // in pixels
  isTransparent?: boolean;

}

interface LabelWrapperProps {
  fontSize?: number; // in pixels
  isTransparent?: boolean;
}

const LabelWrapper = styled('span')<LabelWrapperProps>(
  ({ theme,fontSize,isTransparent }) => {
    return `
      background-color: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(1, 1)};
      font-size: ${theme.typography.pxToRem(fontSize)};
      border-radius: ${theme.general.borderRadius};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing(1)}; 
      text-transform: capitalize;
      // max-height: ${theme.spacing(4)};
      
      &.MuiLabel {
        &-primary {
          background-color: ${isTransparent? "transparent": theme.colors.primary.lighter};
          color: ${theme.palette.primary.main}
        }
        &-black {
          background-color: ${isTransparent? "transparent": theme.colors.alpha.black[100]};
          color: ${theme.colors.alpha.white[100]};
        }
        &-secondary {
          background-color: ${isTransparent? "transparent": theme.colors.secondary.lighter};
          color: ${theme.palette.secondary.main}
        }
        &-success {
          background-color: ${isTransparent? "transparent": theme.colors.success.lighter};
          color: ${theme.palette.success.main}
        }  
        &-warning {
          background-color: ${isTransparent? "transparent": theme.colors.warning.lighter};
          color: ${theme.palette.warning.main}
        }       
        &-error {
          background-color: ${isTransparent? "transparent": theme.colors.error.lighter};
          color: ${theme.palette.error.main}
        }
        &-info {
          background-color: ${isTransparent? "transparent": theme.colors.info.lighter};
          color: ${theme.palette.info.main}
        }
        
      }
`
  }
);

const Label: FC<LabelProps> = ({className,fontSize=13,isTransparent=false,color = 'secondary',tooltip='',children,...rest}) => {
  return (
    <Tooltip title={tooltip} sx={{fontSize: '0.8rem'}} placement="top">
      <LabelWrapper className={'MuiLabel-' + color} isTransparent={isTransparent} fontSize={fontSize} {...rest}>
        {children}
      </LabelWrapper>
    </Tooltip>
  );
};


export default Label;
