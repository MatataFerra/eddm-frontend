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
          <HoverCardContent className="shadow-lg border rounded-md relative overflow-hidden w-48 h-80">
            <p className="font-bold capitalize p-4">
              {geolocation.location}{" "}
              {geolocation.metadata?.country && `- ${geolocation.metadata.country}`}
            </p>
            {geolocation?.metadata?.imgUrl && (
              <div className="w-100 h-full">
                <Image
                  src={geolocation?.metadata?.imgUrl || ""}
                  alt={geolocation.location}
                  width={300}
                  height={150}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            )}
            {geolocation?.metadata?.url && (
              <div
                className="text-sm p-2 w-fit text-white rounded-md absolute bottom-4 left-4 z-100"
                style={{ zIndex: 100 }}>
                <a
                  href={geolocation?.metadata?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline bg-black/30 p-1 rounded-md"
                  style={{
                    backdropFilter: "blur(5px)",
                    WebkitBackdropFilter: "blur(5px)",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "8px",
                    padding: ".5rem 1rem",
                  }}>
                  <span className="font-bold">Ver en mapa</span>
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
