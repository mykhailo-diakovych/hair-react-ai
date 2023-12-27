import { useQuery } from "@tanstack/react-query";
import { PlanService } from "@services/Plan/Plan.service";
import { API_SERVICES } from "@config/constants";

export const useGetPlanQuery = (id?: string) => {
  const queryResponse = useQuery(
    [API_SERVICES.PLAN.serviceName, id],
    () => {
      return PlanService.getPlanById(id);
    },
    {
      staleTime: 1000 * 60
    }
  );

  return queryResponse;
};
