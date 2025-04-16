import { cn } from "@lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  number,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  number?: number | string;
  onClick?: () => void;
}) => {
  return (
    <article
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-lg transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 relative",
        className
      )}
      onClick={onClick}>
      {header}
      <section className="group-hover/bento:translate-x-2 transition duration-200 z-50">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </section>
      {
        // If there is a number, render
        number && (
          <div className="absolute top-0 right-0 bg-zinc-100 rounded-lg z-50 border border-zinc-500/10 shadow text-zinc-900 text-2xl font-bold p-1 size-12 flex items-center justify-center m-2 group-hover/bento:opacity-10 transition-opacity duration-300">
            {number}
          </div>
        )
      }
    </article>
  );
};
