import { ArticleRender } from "@/components/blocks/articles/article-render";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  return <ArticleRender slug={slug} />;
}
