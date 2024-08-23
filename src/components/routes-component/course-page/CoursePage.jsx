import { useContext, useRef } from "react";
import {} from "video.js";
import VideoPlayer from "./VideoPlayer";
import videojs from "video.js";
import { ChapterContext } from "../../../context/ChapterContext";

const CoursePage = () => {
  const activeChapter = useContext(ChapterContext);
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: activeChapter?.videoUrl || "https://res.cloudinary.com/dv9ib9jvl/video/upload/f_auto:video,q_auto/v1/course-videos/66ba4f93451dc4303f381964/5728e51b-3eac-412f-9e17-8f4869652b11-2",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div className="w-11/12 h-full pt-[70px] md:pl-80 m-auto">
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <h1 className="text-xl font-semibold mt-2 self-start">{activeChapter && (activeChapter.name || activeChapter.title)}</h1>
    </div>
  );
};

export default CoursePage;
