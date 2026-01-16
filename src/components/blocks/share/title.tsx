type ShareTitleProps = {
  title: string;
  glowWord?: string;
};

export function ShareTitle({ title, glowWord }: ShareTitleProps) {
  return (
    <h1 className="text-5xl my-8 lg:text-7xl font-bold text-center text-white z-2 font-poppins p-8">
      {title}
      {glowWord && <span className="text-sky-500 ml-4">{glowWord}</span>}
    </h1>
  );
}
