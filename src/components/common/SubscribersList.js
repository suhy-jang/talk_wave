import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

function SubscribersList({ subscribers, handleInviteUser }) {
  return (
    <>
      <div className="absolute right-0 z-10 rounded-bl-lg top-full bg-coolGray-700">
        {subscribers.map((subscriber) => (
          <div
            key={subscriber._id}
            className="px-3 py-1 border-b border-b-coolGray-500 "
          >
            {subscriber.name}
          </div>
        ))}
        <div className="px-3">
          <IconButton
            edge={false}
            color="inherit"
            aria-label="add"
            onClick={handleInviteUser}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default SubscribersList;
