"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LoaderTwo } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
        "w-full max-w-md overflow-hidden cursor-pointer group/home relative",
        isPending && "cursor-wait pointer-events-none"
      )}
      onClick={handleClick}>
      {isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300">
          <LoaderTwo />
        </div>
      )}

      <div className="relative h-72">
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover bg-no-repeat group-hover/home:sepia-50 transition-all"
          loading="lazy"
        />

        <div className="absolute inset-0 transition-colors duration-300 bg-gradient-to-t from-black/70 to-transparent group-hover/home:from-black" />

        <CardContent className="relative h-full flex flex-col justify-end p-6 transform transition-transform duration-300 group-hover/home:translate-x-2">
          <CardFooter className="p-0 flex flex-col items-start">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <small className="font-bold text-white">{description}</small>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
}
