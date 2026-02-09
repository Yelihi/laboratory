"use client";
import { Suspense, useState, useRef, useEffect } from "react";

import styles from "./ContentFactory.module.css";

import type {
  SortedFeedItemResponseDto,
  SortItem,
} from "@/entities/feed/services/interface";
import { SORT_FEED_ITEM_TYPE } from "@/entities/feed/models/enums";

import { queryFeedList } from "@/views/main/services/queryFeedList";
import { WrapperReviewSection } from "@/views/main/ui/components/review/WrapperReviewSection";
import { WrapperGiftSection } from "@/views/main/ui/components/gift/WrapperGiftSection";
import { WrapperShortcutSection } from "@/views/main/ui/components/shortcut/WrapperShortcutSection";
import { FeedSection } from "@/views/main/ui/components/Feed/FeedSection";
import { Pagination } from "@/entities/feed/models/dtos";

export const ContentFactory = ({
  initialSortedItems,
}: {
  initialSortedItems: SortedFeedItemResponseDto;
}) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<Pagination | null>(
    initialSortedItems.pagination
  );
  const [sortedItems, setSortedItems] = useState<SortItem[]>(
    initialSortedItems.items
  );
  const fetchLoadingRef = useRef(false);
  const observerRefInstance = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observeTarget = observerRef.current;

    if (!observeTarget) return;

    // 이미 모든 페이지를 로드했으면 observer를 생성하지 않음
    if (paginationRef.current?.current === paginationRef.current?.total) {
      return;
    }

    const observer = new IntersectionObserver(
      async ([entries]) => {
        if (!entries.isIntersecting) return;

        // pagination 체크
        if (paginationRef.current?.current === paginationRef.current?.total) {
          observer.disconnect();
          return;
        }

        // 이미 로딩 중이면 무시
        if (fetchLoadingRef.current) return;

        fetchLoadingRef.current = true;

        try {
          const nextPage = (paginationRef.current?.current ?? 0) + 1;
          const newSortedItemsDto = await queryFeedList(nextPage, false);

          if (!newSortedItemsDto) {
            throw new Error("데이터가 존재하지 않습니다.");
          }

          setSortedItems((prev) => [...prev, ...newSortedItemsDto.items]);
          console.log(newSortedItemsDto.items);
          paginationRef.current = newSortedItemsDto.pagination;

          // 모든 페이지를 로드했으면 observer disconnect
          if (paginationRef.current.current === paginationRef.current.total) {
            observer.disconnect();
          }
        } catch (error) {
          console.error("[ContentFactory] Error fetching data:", error);
          // 에러 발생 시 observer disconnect하여 무한 재시도 방지
          observer.disconnect();
        } finally {
          fetchLoadingRef.current = false;
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observerRefInstance.current = observer;
    observer.observe(observeTarget);

    return () => {
      observer.disconnect();
      observerRefInstance.current = null;
    };
  }, []);

  const hasMorePages =
    paginationRef.current?.current !== paginationRef.current?.total;

  return (
    <>
      <section className={styles.container}>
        {sortedItems.map((item, index) => {
          switch (item.type) {
            case SORT_FEED_ITEM_TYPE.FEED: {
              return <FeedSection key={index} items={item.items} />;
            }
            case SORT_FEED_ITEM_TYPE.REVIEW: {
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <WrapperReviewSection key={index} />
                </Suspense>
              );
            }
            case SORT_FEED_ITEM_TYPE.GIFT: {
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <WrapperGiftSection key={index} />
                </Suspense>
              );
            }
            case SORT_FEED_ITEM_TYPE.SHORTCUT: {
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <WrapperShortcutSection key={index} />
                </Suspense>
              );
            }
            default: {
              return null;
            }
          }
        })}
        <div className={styles.observerTarget} ref={observerRef} />
      </section>
    </>
  );
};
