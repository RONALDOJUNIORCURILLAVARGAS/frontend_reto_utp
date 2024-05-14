import { Header } from "../components/Header";

interface Props {
  children: JSX.Element;
}
export const ModulesLayout = ({ children }: Props) => {
  return(( <div className="container mx-auto px-4 md:container lg:w-3/4 md:mx-auto">
    <Header/>
    {children}
    </div>));
};
