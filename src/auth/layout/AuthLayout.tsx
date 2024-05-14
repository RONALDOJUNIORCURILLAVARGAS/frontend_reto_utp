interface Props {
  children: JSX.Element;
  title: string;
}

export const AuthLayout = ({ children, title = "" }: Props) => {
  return (
    <div className="container mx-auto">
     

      <section className="h-screen">
        <div className="h-full">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 w-full p-12 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img src="/icons/utp.svg" className="w-full" alt="Sample image" />
            </div>

            <div className="mb-12 md:mb-0 w-9/12 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <div className="flex flex-row items-center justify-center lg:justify-start mb-6">
                <p className="mb-0 me-4 text-[24px] font-bold">{title}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
