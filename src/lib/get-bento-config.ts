type SlotConfig = {
  span: string;
  hasImage: boolean;
  isFeatured: boolean;
  placementImage: "center" | "side";
  aspect: string;
  location?: string;
};

export type BentoConfig = SlotConfig;
type BentoOverride = Partial<Record<number, Partial<SlotConfig>>>;

const DEFAULT_SLOT_CONFIGS: Record<number, SlotConfig> = {
  0: {
    span: "md:col-span-2 md:row-span-2",
    hasImage: true,
    isFeatured: true,
    placementImage: "center",
    aspect: "aspect-square",
  },
  1: {
    span: "md:col-span-1 md:row-span-2",
    hasImage: true,
    isFeatured: false,
    placementImage: "side",
    aspect: "aspect-[9/16]",
  },
  3: {
    span: "md:col-span-2 md:row-span-1",
    hasImage: true,
    isFeatured: false,
    placementImage: "side",
    aspect: "aspect-square",
  },
  4: {
    span: "md:col-span-3 md:row-span-3",
    hasImage: true,
    isFeatured: false,
    placementImage: "center",
    aspect: "aspect-square",
  },
  5: {
    span: "md:col-span-2 md:row-span-2",
    hasImage: true,
    isFeatured: false,
    placementImage: "side",
    aspect: "aspect-[2/1]",
  },
  7: {
    span: "md:col-span-1 md:row-span-3",
    hasImage: true,
    isFeatured: false,
    placementImage: "side",
    aspect: "aspect-square",
  },
};

const DEFAULT_CONFIG: SlotConfig = {
  span: "md:col-span-1 md:row-span-2",
  hasImage: true,
  isFeatured: false,
  placementImage: "side",
  aspect: "aspect-[4/3]",
};

export function getBentoConfig(index: number, customSlotConfigs?: BentoOverride): BentoConfig {
  const slotIndex = index % 10;

  const baseConfig = DEFAULT_SLOT_CONFIGS[slotIndex] || DEFAULT_CONFIG;
  const absoluteCustomConfig = customSlotConfigs?.[index];
  const patternCustomConfig = customSlotConfigs?.[slotIndex];

  return {
    ...baseConfig,
    ...(patternCustomConfig || {}),
    ...(absoluteCustomConfig || {}),
  };
}
