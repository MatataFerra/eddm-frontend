"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LoaderOne } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { GlowingBorderCard } from "@/components/blocks/home/glowing-border-card";

type CardHomeProps = {
  bgImage: string;
  title: string;
  description: string;
  redirect: string;
};

export function CardHome({ bgImage, title, description, redirect }: CardHomeProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.push(redirect);
    });
  };

  return (
    <Card
      className={cn(
        "w-full max-w-md overflow-hidden cursor-pointer group/home relative font-poppins",
        "border-zinc-900/80 transition-all duration-300",
        isPending && "cursor-wait scale-[0.98]"
      )}
      onClick={handleClick}>
      <div
        className={cn(
          "absolute inset-0 z-50 flex items-center justify-center",
          "bg-black/40 backdrop-blur-sm",
          "transition-all duration-300 ease-out",
          isPending ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
        <GlowingBorderCard />

        <div className="scale-75 opacity-90">
          <LoaderOne />
        </div>
      </div>

      <div
        className={cn(
          "relative h-72 transition-all duration-300",
          isPending && "blur-[2px] scale-105"
        )}>
        <Image
          src={bgImage}
          alt={title}
          fill
          className={cn(
            "object-cover bg-no-repeat transition-all duration-300",
            "group-hover/home:scale-110 group-hover/home:brightness-75",
            isPending && "scale-110"
          )}
          loading="lazy"
        />

        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
            "group-hover/home:from-black/90"
          )}
        />
        <CardContent
          className={cn(
            "relative h-full flex flex-col justify-end p-6",
            "transition-all duration-300",
            "group-hover/home:translate-y-[-8px]",
            isPending && "opacity-70"
          )}>
          <CardFooter className="p-0 flex flex-col items-start gap-2">
            <h3
              className={cn(
                "text-xl font-bold text-white",
                "transition-all duration-300",
                "group-hover/home:text-2xl group-hover/home:tracking-wide"
              )}>
              {title}
            </h3>
            <small
              className={cn(
                "font-medium text-white/90 leading-relaxed",
                "transition-all duration-300",
                "group-hover/home:text-white"
              )}>
              {description}
            </small>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
}
