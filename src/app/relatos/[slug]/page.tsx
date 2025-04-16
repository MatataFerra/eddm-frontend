import { TaleRender } from "@/components/blocks/tales/tale-render";

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  return <TaleRender slug={slug} />;
}
