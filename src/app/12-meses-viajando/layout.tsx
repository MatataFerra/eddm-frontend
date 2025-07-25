import { MobileIndexContent } from "@/components/ui/index-content/mobile";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileIndexContent />
      {children}
    </>
  );
}
