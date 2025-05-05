import { graphql } from "@/generated/graphql";
import { performRequest } from "@/lib/datocms";
import HtmlReactParser from "html-react-parser";
import prepareArticleContent from "@/lib/datocms/prepareArticleContent";

const singlePageQueryDocument = graphql(/* GraphQL */ `
  query singlePage($slug: String) {
    data: page(filter: { slug: { eq: $slug } }) {
      id
      title
      content
    }
  }
`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { data } = await performRequest(singlePageQueryDocument, {
    variables: {
      slug: (await params).url,
    },
  });

  return {
    title: `${data?.title} | Novinky`,
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ url: string }>;
}) {
  const { data } = await performRequest(singlePageQueryDocument, {
    variables: {
      slug: (await params).url,
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
