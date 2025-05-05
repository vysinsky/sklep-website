import { graphql } from "@/generated/graphql";
import { performRequest } from "@/lib/datocms";
import HtmlReactParser from "html-react-parser";
import prepareArticleContent from "@/lib/datocms/prepareArticleContent";

const singleNewsQueryDocument = graphql(/* GraphQL */ `
  query singleNews($id: ItemId) {
    data: news(filter: { id: { eq: $id } }) {
      id
      title
      content
      _publishedAt
    }
  }
`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data } = await performRequest(singleNewsQueryDocument, {
    variables: {
      id: (await params).id,
    },
  });

  return {
    title: `${data?.title} | Novinky`,
  };
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data } = await performRequest(singleNewsQueryDocument, {
    variables: {
      id: (await params).id,
    },
  });

  return (
    <div className="p-4">
      <h3 className="text-2xl text-black mb-5">{data?.title}</h3>
      <div>
        {data?.content && HtmlReactParser(prepareArticleContent(data.content))}
      </div>
    </div>
  );
}
