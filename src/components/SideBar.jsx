import React from "react";
import TypeWriterEffect from "react-typewriter-effect";
import github from "../assets/github.svg";
import twitter from "../assets/twitter.svg";
import user from "../assets/user.svg";

const SideBar = ({ setChatLog, chatLog }) => {
  const clearChat = () => {
    setChatLog([]);
  };

  return (
    <aside className="sidemenu">
      <div className="side-menu-button" onClick={clearChat}>
        <span>+</span>
        New Chat
      </div>
      {chatLog.map((item, index) => {
        return (
          <TypeWriterEffect
            textStyle={{
              fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              fontSynthesis: "none",
              marginBottom: "0.5em",
              border: "solid 1px black",
              padding: "0.5em",
              borderRadius: "10px",
            }}
            startDelay={100}
            cursorColor="black"
            text={item.message}
            typeSpeed={20}
            eraseSpeed={100}
            hideCursorAfterText="true"
            key={index}
          />
        );
      })}
      <div className="project-info">
        <div className="about">
          <div className="box">
            <img src={user} alt="user image" />
            <p>current User</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
