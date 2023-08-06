function MessageList({ chatHistory }) {
  return (
    <div className="text-left p-3">
      {chatHistory.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
}

export default MessageList;
