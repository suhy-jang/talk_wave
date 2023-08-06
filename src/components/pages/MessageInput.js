function MessageInput({ message, typing, handleInputChange, sendMessage }) {
  return (
    <div className="pl-3 pr-2">
      <input
        value={message}
        onChange={handleInputChange}
        onKeyDown={sendMessage}
        placeholder="Type a message and press Enter"
        className="bg-coolGray-700 rounded-md w-full px-2 py-1 border-none outline-none"
      />
      {typing && <div>Someone is typing...</div>}
    </div>
  );
}

export default MessageInput;
