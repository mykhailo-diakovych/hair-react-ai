import { useSearchParams } from "react-router-dom";

export const useSetTabStep = ({ tabsName }: { tabsName: string }) => {
  const [, setSearchParams] = useSearchParams();

  const handleChangeStep = (step: number) => {
    const params = new URLSearchParams(location.search);

    params.set(tabsName, step.toString());

    setSearchParams(params.toString());
  };

  const nextStep = () => {
    const params = new URLSearchParams(location.search);
    const currentStep = parseInt(params.get(tabsName) || "1");

    params.set(tabsName, (currentStep + 1).toString());

    setSearchParams(params.toString());
  };

  return { updateTab: handleChangeStep, next: nextStep };
};
