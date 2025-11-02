import { NavigationWrapper } from "@/components/blocks/share/navigation-wrapper";
import { MobileIndexContent } from "@/components/ui/index-content/mobile";
import { APP_ROUTES } from "@/lib/constants";
import { monthsOrdered } from "@/lib/utils";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileIndexContent />
      {children}
      <NavigationWrapper redirect={APP_ROUTES.journey} typeOfOrder={monthsOrdered} />
    </>
  );
}
