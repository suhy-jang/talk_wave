import CurrentUserMessage from './CurrentUserMessage';
import OtherUserMessage from './OtherUserMessage';
import EventMessage from './EventMessage';

function ChatLine({ chatHistory, user, index, style }) {
  const message = chatHistory[index];
  const { _id, timestamp, content, creator, event } = message;

  return (
    <div key={_id} style={style}>
      {event && <EventMessage event={event} />}
      {!event && user._id === creator._id && (
        <CurrentUserMessage content={content} timestamp={timestamp} />
      )}
      {!event && user._id !== creator._id && (
        <OtherUserMessage
          content={content}
          timestamp={timestamp}
          creator={creator}
        />
      )}
    </div>
  );
}
export default ChatLine;
