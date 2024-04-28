import React, { useState, useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";

const ChatBox = ({ chatLog, setChatLog }) => {
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChatLogData = [...chatLog, { user: "human", message: `${input}` }];

    setInput("");

    setChatLog(newChatLogData);

    const messages = newChatLogData
      .map((message) => message.message)
      .join("\n");

    const response = await fetch(
      "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: messages,
          max_tokens: 50, // Adjust as needed
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setChatLog([
        ...newChatLogData,
        { user: "gpt", message: `${data.choices[0].text.trim()}` },
      ]);
    }
  };

  return (
    <>
      <div className="chat-log">
        {chatLog.map((item, i) => (
          <ChatMessage key={i} {...item} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input-textarea"
            placeholder="Ask Helpai Anthing..."
          ></input>
        </form>
      </div>
    </>
  );
};

export default ChatBox;
