import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import videojs from "video.js";
import { client } from "../utils";
import "video.js/dist/video-js.css";

const Player = ({ previewUrl }) => {
  const videoRef = useRef(null);

  const dispatch = useDispatch();
  const { id: videoId, url: src, thumb: poster } = useSelector(
    (state) => state.video.data
  );

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: false,
      aspectRatio: "16:9",
    });

    if (!previewUrl) {
      vjsPlayer.poster(poster);
      vjsPlayer.src(src);
    }

    if (previewUrl) {
      vjsPlayer.src({ type: "video/mp4", src: previewUrl });
    }

    vjsPlayer.on("ended", () => {
      client(`${process.env.REACT_APP_BACKEND_URL}/videos/${videoId}/view`);
    });

    return () => {
      if (vjsPlayer) {
        vjsPlayer.dispose();
      }
    };
  }, [videoId, dispatch, src, previewUrl, poster]);

  return (
    <div data-vjs-player>
      <video
      style = {{objectFit : "contain"}}
        controls
        ref={videoRef}
        className="video-js vjs-fluid vjs-big-play-centered"
      ></video>
    </div>
  );
};

export default Player;
