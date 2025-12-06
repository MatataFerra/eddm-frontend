export type DockItemProps = {
  keyId: string;
  title: string | "separator";
  icon: React.ReactNode;
  href?: string;
  className?: string;
  only?: "mobile" | "desktop";
  onClick?: () => void;
};
