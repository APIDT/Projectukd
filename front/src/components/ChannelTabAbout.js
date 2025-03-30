import React from "react";
import { useSelector } from "react-redux";

const ChannelTabAbout = () => {
  const { channelDescription: about } = useSelector(
    (state) => state.profile.data
  );

  return <p>{about ? about : "Немає опису каналу"}</p>;
};

export default ChannelTabAbout;
