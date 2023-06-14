import { Feeds, useGetFeedsQuery } from "@/lib/redux/apis/endpoints/feeds"
// import Image from "next/image"
import { useEffect, useState } from "react"

const FeedCards = ({ feed }: {feed: Feeds}) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const defaultSize = 250
  const size = isMobile ? defaultSize / 1.5 : defaultSize;

  return (
    <div className="flex gap-10 gap-md-2 my-4 my-md-2 feedsCard">
      <img
        src={feed.image_url}
        alt={feed.title}
        height={size}
        width={isMobile ? size + 5 : size + 35}
        // placeholder="blur"
        className="feedImage"
      />
      <div className="flex justify-center flex-col">
        <p className="categories">{feed.categories?.map((category) => category.name).join(', ')}</p>
        <a className="underline url title" target="_blank" href={`${process.env.NEXT_PUBLIC_BASE_URL}api/feed/show/${feed.slug}`}>{feed.title}</a>
        <p className="description">{feed.description}</p>
        <p className="sourceAndDate">{feed.source?.name} <span>&#183;</span> {new Date(feed.published_at)?.toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default FeedCards