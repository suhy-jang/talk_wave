import CurrentUserMessage from './CurrentUserMessage';
import OtherUserMessage from './OtherUserMessage';

function ChatLine({ chatHistory, user, index, style }) {
  const message = chatHistory[index];
  const { _id, timestamp, content, creator } = message;

  return (
    <div key={_id} style={style}>
      {user._id === creator._id ? (
        <CurrentUserMessage content={content} timestamp={timestamp} />
      ) : (
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
