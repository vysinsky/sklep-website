import { FC } from "react";
import Link from "next/link";
import HtmlReactParser from "html-react-parser";

import { graphql } from "@/generated/graphql";
import { performRequest } from "@/lib/datocms";
import prepareArticleContent from "@/lib/datocms/prepareArticleContent";

type Props = {
  displayItemsCount?: number;
};

const newsQueryDocument = graphql(/* GraphQL */ `
  query NewsList($first: IntType) {
    items: allNews(orderBy: [_publishedAt_DESC], first: $first) {
      id
      title
      content
      _publishedAt
    }
    itemsCount: _allNewsMeta {
      count
    }
  }
`);

const News: FC<Props> = async ({ displayItemsCount }) => {
  const newsList = await performRequest(newsQueryDocument, {
    variables: {
      first: displayItemsCount,
    },
  });

  return (
    <div className="flex flex-col items-center">
      <section className="flex flex-col gap-10 pt-10 pb-7">
        {newsList.items.map((news) => {
          return (
            <div key={news.id} className="flex flex-col gap-2">
              <h4 className="text-xl">
                <Link
                  href={`/novinky/${news.id}`}
                  className="hover:text-[#1ec6b6]"
                >
                  {news.title}
                </Link>
              </h4>
              <p>
                Publikováno: {new Date(news._publishedAt).toLocaleDateString()}
              </p>
              {news.content && (
                <div className="max-h-[200px] overflow-hidden">
                  {HtmlReactParser(prepareArticleContent(news.content))}
                </div>
              )}
            </div>
          );
        })}
      </section>
      {newsList.itemsCount.count >
        (displayItemsCount || newsList.itemsCount.count) && (
        <Link
          href="/novinky"
          className="p-5 text-white bg-[#ff4a52] hover:bg-[#1ec6b6] text-center border-0 rounded-md"
        >
          Více novinek
        </Link>
      )}
    </div>
  );
};

export default News;
