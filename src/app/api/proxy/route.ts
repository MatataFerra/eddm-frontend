// Server-side: agrega el token y consulta la API real
import { generateToken } from "@/lib/services/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path"); // ej: "/articles"
  const qs = url.searchParams.get("qs") ?? ""; // ej: "populate=*&fields=id"

  if (!path?.startsWith("/")) {
    return NextResponse.json({ message: "Bad path" }, { status: 400 });
  }

  const token = generateToken({
    user: process.env.TOKEN_USER!,
    password: process.env.TOKEN_PASSWORD!,
  });

  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/api${path}${qs ? `?${qs}` : ""}`;
  const res = await fetch(fullUrl, {
    headers: { Authorization: `Bearer ${token}` },
    // si querés cache server-side:
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return NextResponse.json({ message: `Upstream error ${res.status}` }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
