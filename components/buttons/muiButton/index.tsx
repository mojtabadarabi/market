import * as React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

interface Props {
    background?: string,
    textColor?: string,
    children?: string,
    backgroundHover?: string,
}

const ColorButton = styled(Button)<Props>(({textColor, background, backgroundHover}) => ({
    color: `${textColor} !important`,
    'background-image': `${background} !important`,
    textTransform: 'capitalize',
    '&:hover': {
        'background-image': `${backgroundHover} !important`,
    }
}));

export default function CustomizedMuiButton({children, background, textColor, backgroundHover}: Props) {
    return (
        <ColorButton
            variant="contained"
            background={background || 'var(--mui-action-btn-background)' || '#000'}
            backgroundHover={backgroundHover || 'var(--mui-action-btn-background-hover' || '#000'}
            textColor={textColor || 'var(--mui-action-btn-text)' || '#fff'}
        >{children || 'Button'}</ColorButton>
    );
}