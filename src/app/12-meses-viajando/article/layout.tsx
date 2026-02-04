import { ResponsiveIndexContent } from "@/components/blocks/index-content/responsive-index-content";
import { LocalStorageConfigProvider } from "@/lib/providers/local-storage-provider";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LocalStorageConfigProvider>
        <ResponsiveIndexContent />
        {children}
      </LocalStorageConfigProvider>
    </>
  );
}
