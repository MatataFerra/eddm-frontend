import { ResponsiveIndexContent } from "@/components/blocks/index-content/responsive-index-content";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ResponsiveIndexContent />
      {children}
    </>
  );
}
