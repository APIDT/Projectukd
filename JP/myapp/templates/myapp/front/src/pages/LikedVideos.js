import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TrendingCard from "../components/TrendingCard";
import { StyledTrending } from "./Trending";
import Skeleton from "../skeletons/TrendingSkeleton";
import { getLikedVideos } from "../reducers/likedVideo";

const LikedVideos = () => {
  const dispatch = useDispatch();
  const { isFetching, videos } = useSelector((state) => state.likedVideo);

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <StyledTrending>
      <h2>Вподобані відео</h2>

      {videos?.length === 0 && (
        <p className="secondary">
          Вподобані відео будуть відображатися тут.
        </p>
      )}

      {videos.map((video) => (
        <Link key={video.id} to={`/watch/${video.id}`}>
          <TrendingCard video={video} />
        </Link>
      ))}
    </StyledTrending>
  );
};

export default LikedVideos;
