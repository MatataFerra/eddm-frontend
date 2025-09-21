import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Image from "next/image";
import { MapPinBadge } from "@/components/blocks/share/map-pin";
import { GeolocationWithMetadata } from "@/lib/schemas";

type Props = {
  geolocation: GeolocationWithMetadata;
};

export function ArticleHoverCard({ geolocation }: Props) {
  return (
    <>
      {geolocation?.metadata ? (
        <HoverCard>
          <HoverCardTrigger>
            <MapPinBadge name={geolocation.location} className="cursor-pointer" />
          </HoverCardTrigger>
          <HoverCardContent className="shadow-lg border aspect-[16/9] rounded-md relative overflow-hidden">
            <p className="font-bold capitalize p-4">
              {geolocation.location}{" "}
              {geolocation.metadata?.country && `- ${geolocation.metadata.country}`}
            </p>
            {geolocation?.metadata?.imgUrl && (
              <Image
                src={geolocation?.metadata?.imgUrl || ""}
                alt={geolocation.location}
                width={350}
                height={250}
                style={{ objectFit: "cover", width: "100%", height: "250px" }}
                priority
              />
            )}
            {geolocation?.metadata?.url && (
              <div
                className="text-sm p-2 w-fit text-white rounded-md absolute bottom-4 left-4 z-100"
                style={{ zIndex: 100 }}>
                <a
                  href={geolocation?.metadata?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline">
                  <span className="font-bold">Ver mapa:</span> Link
                </a>
              </div>
            )}
          </HoverCardContent>
        </HoverCard>
      ) : (
        <MapPinBadge name={geolocation.location} />
      )}
    </>
  );
}
