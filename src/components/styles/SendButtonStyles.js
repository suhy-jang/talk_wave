import { styled } from '@mui/system';
import tw from 'twin.macro';
import IconButton from '@mui/material/IconButton';

const SendButtonComponent = styled(IconButton)(({ theme }) => ({
  ...tw`absolute right-0 p-1 rounded-inherit bg-highlightPurple top-1/2`,
  transform: 'translateY(-50%) translateX(-50%)',
  '&:hover': {
    backgroundColor: theme.palette.highlight.shadow,
    borderColor: theme.palette.highlight.shadow,
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: theme.palette.highlight.light,
    borderColor: theme.palette.highlight.light,
  },
  '&:focus': {
    boxShadow: theme.palette.highlight.light,
  },
}));

export default SendButtonComponent;
