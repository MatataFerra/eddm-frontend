import { getIndexContent } from "@/lib/api_methods/get-index-content";
import { ENDPOINTS } from "@/lib/constants";
import { type IndexContent } from "@/lib/interfaces/articles";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function ListIndexContent() {
  const { data, status } = useQuery<IndexContent[]>({
    queryKey: ["indexContent"],
    queryFn: () => getIndexContent(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const groupByMonth = (items: IndexContent[]) => {
    return Object.groupBy(items, (item) => {
      return item.category.name;
    });
  };

  return (
    <ol className="pl-8">
      {status === "pending" ? (
        <li>
          <h2 className="font-bold capitalize">Loading...</h2>
        </li>
      ) : data && Object.keys(groupByMonth(data)).length > 0 ? (
        Object.entries(groupByMonth(data)).map(([month, items]) => (
          <li key={month}>
            <h2 className="font-bold capitalize mb-0">{month}</h2>
            <ul>
              {items?.map((item) => (
                <li key={item.id}>
                  <Link href={`${ENDPOINTS.ARTICLE(item.slug)}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))
      ) : (
        <li>No hay contenido disponible.</li>
      )}
    </ol>
  );
}
