import FeedItem from "@/components/Feed/FeedItem/FeedItem";
import FeedItemFooter from "@/components/Feed/FeedItem/FeedItemFooter";
import NoResult from "@/components/Feed/NoResult";
import Spinner from "@/components/Spinner";
import { useFeedList, useIntersect } from "@/hooks";
import { useFetchRecord } from "@/hooks/useFetchRecord";
import { useParams } from "react-router-dom";

function Place() {
  const { recordId, placeId } = useParams();
  const { data: record } = useFetchRecord(recordId);
  const { data, isLoading, hasNextPage, fetchNextPage } = useFeedList(`place.id='${placeId}'`);
  const result = data?.flatMap((el) => el.items).filter((el) => el.id !== record?.id) || null;

  // 인피니트 스크롤
  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    { threshold: 1 }
  );

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size={160} />
      </div>
    );
  }

  return (
    <>
      <h2 className="sr-only">플레이스 페이지</h2>
      {record && <FeedItemFooter item={record} isPlace={true} />}
      {record && <FeedItem key={record?.id} item={record} isPlace={true} />}
      <div className="border-t-2 pt-4 text-lg font-semibold">이 장소의 다른 리뷰</div>
      <ul className="flex flex-col gap-1 bg-gray-50">
        {result.length ? (
          result.map((item) => (
            <li key={item.id}>
              <FeedItem item={item} isPlace={true} />
            </li>
          ))
        ) : (
          <NoResult title="다른 리뷰가 없습니다." contents="이 장소를 방문하시고 리뷰를 추가해 보세요." />
        )}
      </ul>
      <div ref={ref} className="h-[1px]"></div>
    </>
  );
}

export default Place;
