import React, { useState, useEffect, useRef } from "react";

const DirectChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Function to scroll to the bottom of the chat when a new message is added
  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "You" }]);
      setInputMessage("");
    }
  };

  return (
    <div className="direct-chat">
      <div className="direct-chat-header">
        <h3>Direct Chat</h3>
      </div>
      <div
        className="direct-chat-messages"
        ref={messagesContainerRef}
        style={{ maxHeight: "300px", overflowY: "auto" }}  // Limit scrolling to this container
      >
        {messages.map((message, index) => (
          <div key={index} className="direct-chat-msg">
            <div className="direct-chat-info">
              <span className="direct-chat-name">{message.sender}</span>
            </div>
            <div className="direct-chat-text">
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="direct-chat-footer">
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DirectChat;
