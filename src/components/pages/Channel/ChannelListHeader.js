import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const ChannelListHeader = ({ openCreateChannelModal }) => {
  return (
    <div className="h-[40px] bg-coolGray-900">
      <div className="flex items-center justify-between w-full text-xs uppercase">
        <div className="px-4 py-3 font-semibold text-coolGray-400">Channel</div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={openCreateChannelModal}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChannelListHeader;
