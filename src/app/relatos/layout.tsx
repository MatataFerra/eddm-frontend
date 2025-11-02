import { NavigationWrapper } from "@/components/blocks/share/navigation-wrapper";
import { MobileIndexContent } from "@/components/ui/index-content/mobile";
import { APP_ROUTES } from "@/lib/constants";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileIndexContent />
      {children}
      <NavigationWrapper
        redirect={APP_ROUTES.tales}
        typeOfOrder={[
          {
            type: "category",
            name: "tale",
          },
        ]}
      />
    </>
  );
}
