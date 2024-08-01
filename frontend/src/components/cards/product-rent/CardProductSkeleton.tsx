import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardProductSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <article className="relative flex flex-col gap-4 rounded-md bg-lowcontrast p-4">
        <div className="flex gap-4">
          <section className="relative aspect-square h-80 w-80 overflow-hidden rounded-lg">
            <Skeleton height="100%" width="100%" />
          </section>
          <div className="flex grow flex-col gap-10">
            <div className="flex h-full flex-col gap-3">
              <section className="flex flex-col gap-3">
                <div className="flex items-center justify-end gap-3">
                  <div className="flex w-max items-center justify-center rounded px-3 py-1">
                    <Skeleton width={100} height={20} />
                  </div>
                </div>
                <div className="flex flex-col border-l-4 border-warning px-3 py-1">
                  <Skeleton height={25} width="75%" />
                  <Skeleton
                    height={20}
                    width="25%"
                    style={{ marginTop: "8px" }}
                  />
                </div>
              </section>

              <section className="flex flex-col gap-3">
                <Skeleton height={20} width="100%" />
                <Skeleton height={20} width="75%" />
                <Skeleton height={20} width="67%" />
              </section>
            </div>
            <div className="flex grow basis-0 flex-col items-start justify-end">
              <div className="mb-2 w-1/2">
                <Skeleton height={35} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 w-full rounded-sm">
          <Skeleton height={"100%"} />
        </div>
      </article>
    </SkeletonTheme>
  );
};

export default CardProductSkeleton;
