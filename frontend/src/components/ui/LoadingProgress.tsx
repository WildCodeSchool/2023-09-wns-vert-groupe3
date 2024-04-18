import styles from "styles/pages/ProductsPage.module.scss";
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
    <section className="mt-32 flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Les équipements stars</h2>
      <main className={styles.productsPage}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Progress.Root
            className="relative h-[25px] w-[300px] overflow-hidden rounded-full bg-blackA6"
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
        </div>
      </main>
    </section>
  );
};

export default LoadingProgress;
