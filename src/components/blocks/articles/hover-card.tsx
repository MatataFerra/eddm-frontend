"use client";

import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { MapPinBadge } from "@/components/blocks/share/map-pin";
import { GeolocationWithMetadata } from "@/lib/schemas";
import { useState } from "react";
import { ArticleHoverCardContent } from "@/components/blocks/articles/hover-card-content";

type Props = {
  geolocation: GeolocationWithMetadata;
};

export function ArticleHoverCard({ geolocation }: Props) {
  const [openCard, setOpenCard] = useState(false);

  function onClickCard() {
    setOpenCard(!openCard);
  }

  return (
    <>
      {geolocation?.metadata ? (
        <HoverCard open={openCard} onOpenChange={setOpenCard}>
          <HoverCardTrigger onClick={onClickCard}>
            <MapPinBadge name={geolocation.location} className="cursor-pointer" />
          </HoverCardTrigger>
          <ArticleHoverCardContent geolocation={geolocation} />
        </HoverCard>
      ) : (
        <MapPinBadge name={geolocation.location} />
      )}
    </>
  );
}
