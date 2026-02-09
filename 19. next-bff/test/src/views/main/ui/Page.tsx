import { queryFeedList } from "@/views/main/services/queryFeedList";
import { ContentFactory } from "@/views/main/ui/ContentFactory";

export const MainPage = async () => {
  const initialSortedItems = await queryFeedList(1, true);

  if (!initialSortedItems) {
    return <div>Error</div>;
  }

  return <ContentFactory initialSortedItems={initialSortedItems} />;
};
