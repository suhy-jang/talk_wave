import { styled } from '@mui/system';
import tw from 'twin.macro';

export const ModalContainer = styled('div')(({ theme }) => ({
  ...tw`
    absolute top-[50%] left-[50%]
    w-[400px] max-w-full
    bg-highlightPurple
    border-2 border-black
    shadow-xl
    p-4
    rounded-lg
    outline-none
  `,
  transform: 'translate(-50%, -50%)',
}));
