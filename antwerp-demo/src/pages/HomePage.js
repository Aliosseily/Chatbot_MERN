import React, { Fragment } from "react";
import PersistentDrawerLeft from "../components/Layout/Drawer/Drawer";
import ChatBox from "../components/Chat/ChatBox";

const HomePage = (props) => {


  return (
    <Fragment>
      <ChatBox />
      <PersistentDrawerLeft />
    </Fragment>
  );
};

export default HomePage;
