import ChannelItem from './ChannelItem';

const ChannelList = ({
  channels,
  selectedChannel,
  onSelectChannel,
  handleDeleteChannel,
}) => {
  return (
    <>
      {channels.map((channel) => (
        <ChannelItem
          key={channel._id}
          channel={channel}
          selectedChannel={selectedChannel}
          onSelectChannel={onSelectChannel}
          handleDeleteChannel={handleDeleteChannel}
        />
      ))}
    </>
  );
};

export default ChannelList;
