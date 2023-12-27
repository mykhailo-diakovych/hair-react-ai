import { useQuery } from "@tanstack/react-query";
import { PlanService } from "@services/Plan/Plan.service";
import { API_SERVICES } from "@config/constants";

export const useGetAllPlansQuery = () => {
  const queryResponse = useQuery(
    [API_SERVICES.PLAN.serviceName],
    () => {
      return PlanService.getAllPlans();
    },
    {
      staleTime: 1000 * 60
    }
  );

  return queryResponse;
};
