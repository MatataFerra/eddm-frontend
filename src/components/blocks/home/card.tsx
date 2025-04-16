"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type CardHomeProps = {
  bgImage: string;
  title: string;
  description: string;
  redirect: string;
};

export function CardHome({ bgImage, title, description, redirect }: CardHomeProps) {
  const router = useRouter();

  return (
    <Card
      className="w-full max-w-md overflow-hidden cursor-pointer group/home"
      onClick={() => router.push(redirect)}>
      <div className="relative h-72">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat group-hover/home:sepia-50"
          style={{
            backgroundImage: `url('${bgImage}')`,
          }}
        />

        {/* Gradiente para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 transition-colors duration-300 bg-gradient-to-t from-black/70 to-transparent group-hover/home:from-black" />

        {/* Contenido de la tarjeta */}
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
