import { BentoCard } from "@components/blocks/articles/bentoCard";
import type { Article } from "@lib/interfaces/articles";
import { BentoWrapper } from "@blocks/articles/bentoGrid";
import { getArticles } from "@lib/api_methods/get-articles";

export default async function Page() {
  const articles = await getArticles();

  function bentoCardAligner(article: Article, index: number) {
    if (index % 2 !== 0) {
      return { article: { ...article }, className: "col-span-1" };
    }

    return { article: { ...article }, className: "col-span-3" };
  }

  return (
    <>
      <h1 className="text-2xl my-4 md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        El diario de Mati
      </h1>
      <BentoWrapper>
        {articles
          .toSorted((a, b) => a.order - b.order)
          .map((article, index) => (
            <BentoCard
              key={article.id}
              order={article.order}
              {...bentoCardAligner(article, index)}
            />
          ))}
      </BentoWrapper>
    </>
  );
}
