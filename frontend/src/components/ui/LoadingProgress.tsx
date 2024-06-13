import * as Progress from "@radix-ui/react-progress";
import React from "react";

const LoadingProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setProgress(100);
    }, 100);
  }, []);

  return (
    <Progress.Root
      className="relative inset-0 h-[16px] w-[300px] overflow-hidden rounded-full bg-blackA6"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full w-full bg-[#5461FC] transition-transform duration-[2000ms]" // 2 secondes pour la transition
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default LoadingProgress;
