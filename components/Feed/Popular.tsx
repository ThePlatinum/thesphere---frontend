import { useGetPopularFeedQuery } from "@/lib/redux/apis/endpoints/feeds";
import Loader from "../Loader";

const Popular = () => {
  const { data: popular, isLoading, isFetching } = useGetPopularFeedQuery();

  return (
    <div>
      {(isLoading || isFetching) && <Loader height={30} />}

      {(popular && !isFetching) && (
        <div
          className="popularFeed"
          style={{
            backgroundImage: `url(${popular.image_url})`,
          }}
        >
          <div className="feedsCard">
            <p className="categories">
              {popular.categories?.map((category) => category.name).join(", ")}
            </p>
            <a
              className="underline url title"
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_BASE_URL}api/feed/show/${popular.slug}`}
            >
              {popular.title}
            </a>
            <p className="description">{popular.description}</p>
            <p className="sourceAndDate">
              {popular.source?.name} <span>&#183;</span>{" "}
              {new Date(popular.published_at)?.toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popular;