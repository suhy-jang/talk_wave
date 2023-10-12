import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box } from '@mui/material';
import { REQUIRED_SUBSCRIPTION } from '../../../utils/constants';
import { useAuth } from '../../../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

const ChannelItem = ({
  channel,
  onSelectChannel,
  selectedChannel,
  handleDeleteChannel,
}) => {
  const { user } = useAuth();

  return (
    <>
      <div className="relative py-2 text-lg border-b cursor-pointer border-b-coolGray-500">
        <Box
          onClick={() => onSelectChannel(channel)}
          className={`flex justify-center ${
            selectedChannel?._id === channel._id ? 'bg-coolGray-700' : ''
          }`}
        >
          <div>{channel.name}</div>
          {channel.key && channel.key === REQUIRED_SUBSCRIPTION && <LockIcon />}
          {channel.key && channel.key !== REQUIRED_SUBSCRIPTION && (
            <LockOpenIcon />
          )}
        </Box>
        <Box className="absolute flex justify-center transform -translate-y-1/2 right-1 top-1/2">
          {user && channel.creator === user._id && (
            <DeleteIcon onClick={() => handleDeleteChannel(channel._id)} />
          )}
        </Box>
      </div>
    </>
  );
};

export default ChannelItem;
