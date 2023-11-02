import { ChildrenPropsType } from "../../lib/types";

const VideoBackgroundLayout = ({ children }: ChildrenPropsType) => {
  return (
    <section className="absolute right-0 h-screen w-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute left-0 top-0 h-full w-full object-cover sm:text-white"
      >
        <source src="/assets/videos/xplore-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute left-0 top-0 h-full w-full bg-black/70"></div>
      {children}
    </section>
  );
};

export default VideoBackgroundLayout;
