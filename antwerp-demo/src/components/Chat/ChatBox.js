import { Avatar, Box, Menu, SpeedDial } from "@mui/material";
import React, { useState } from "react";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import classes from "./ChatBox.module.css";
import ChatIcon from "@mui/icons-material/Chat";
import useAxios from "../../hooks/use-axios";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import $ from "jquery";

const ChatBox = () => {
  const userLoacal = JSON.parse(localStorage.getItem("user"));
  const userId = userLoacal[0].id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatlist, setChatlist] = useState([]);
  const { error, isLoading, sendRequest } = useAxios();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  // on Click speed dial
  const onOpenChatBox = (event) => {
    setAnchorEl(event.currentTarget);
    sendRequest(
      {
        url: `http://localhost:4000/api/v1/chat/${userId}`,
      },
      onLoadPreviousChats
    );
  };
  // load previous chats
  const onLoadPreviousChats = (prvChats) => {
    setChatlist([]);
    const greetings = {
      who: "Bot",
      content: "Greetings, How can I assist",
    };
    setChatlist((prevState) => [...prevState, greetings]);
    for (let i in prvChats.data.data) {
      let conversation = {
        who: prvChats.data.data[i].who,
        content: prvChats.data.data[i].content,
      };
      setChatlist((prevState) => [...prevState, conversation]);
    }
  };
  // get user reponse when enter
  const keyPressHanlder = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        return;
      }
      let requestConversation = {
        who: "Me",
        content: event.target.value,
      };
      setChatlist((prevState) => [...prevState, requestConversation]);
      sendRequest(
        {
          url: "http://localhost:4000/api/v1/intent/getresponse",
          method: "POST",
          data: { request: event.target.value },
        },
        onResponseDone.bind(this, requestConversation)
      );
      event.target.value = "";
    }
  };
  // when respone of user request done
  const onResponseDone = (requestConversation, data) => {
    let responseConversation = {
      who: "Bot",
      content: data.data.data[0].response,
    };
    setChatlist((prevState) => [...prevState, responseConversation]);
    scrollDown();
    postQuery(requestConversation, responseConversation);
  };
  // post chat of user and bot to db
  const postQuery = (requestConversation, responseConversation) => {
    const array = [
      { ...requestConversation, user: userId },
      { ...responseConversation, user: userId },
    ];
    for (let i in array) {
      sendRequest(
        {
          url: "http://localhost:4000/api/v1/chat",
          method: "POST",
          data: array[i],
        },
        () => {
          console.log("DONE");
        }
      );
    }
  };

  const scrollDown = () => {
    const objControl = document.querySelector('.scrollingContainer');
    objControl.scrollTop = objControl.scrollHeight;
    //scrollTop
  }

  return (
    <div>
      <Menu
        style={{ marginTop: -17, marginLeft: -100 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {error && <p className="errorText">{error}</p>}
        <Box className="scrollingContainer"
          color={"#858585"}
          width={300}
          height={400}
          overflow={"auto"}
          paddingBottom={"3rem"}
        >
          {isLoading ? (
            <CircularProgress className={classes.loader} />
          ) : (
            <SendIcon className={classes.loader} />
          )}

          {chatlist.map((chat, i) => {
            const { who, content } = chat;
            return (
              <Box
                p={1}
                margin={"5px"}
                borderBottom={"1px solid #eeeeee"}
                color={"#0a6c74"}
                display={"flex"}
                key={i}
              >
                <Box>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      marginTop: -0.5,
                      marginRight: 1,
                    }}
                  >
                    {who === "Bot" ? (
                      <SmartToyOutlinedIcon fontSize="small" />
                    ) : (
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    )}
                  </Avatar>
                </Box>
                <Box>
                  <p className={classes.message__Sender}>{who}</p>
                  <p className={classes.message__content}>{content}</p>
                </Box>
              </Box>
            );
          })}

          <input
            onKeyPress={keyPressHanlder}
            placeholder="Enter message..."
            className={classes.input}
          ></input>
        </Box>
      </Menu>

      <SpeedDial
        onClick={onOpenChatBox}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 30, right: 20 }}
        icon={<ChatIcon />}
        FabProps={{
          sx: {
            bgcolor: "#2cb1bc",
            "&:hover": {
              bgcolor: "#0a6c74",
            },
          },
        }}
      ></SpeedDial>
    </div>
  );
};

export default ChatBox;
