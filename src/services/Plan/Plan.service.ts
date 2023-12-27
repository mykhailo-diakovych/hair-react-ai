import { Plan } from "@services/Plan/interfaces/Plan.interface";
import { API_SERVICES, FunctionService } from "@config/constants";
import { Api } from "@api/api";

export class PlanServiceApi extends Api {
  public constructor({ serviceName }: { serviceName: string }) {
    super(serviceName);
  }

  public async getPlanById<T = unknown>(id?: string) {
    if (!id) return null;

    const plan = await this.get<T, Plan>(
      (API_SERVICES.PLAN.GET_BY_ID as FunctionService)(id)
    );

    return plan.data;
  }

  public async getAllPlans<T = string>() {
    const plans = await this.get<T>(API_SERVICES.PLAN.GET_ALL as string);

    return plans.data?.results as Plan[];
  }
}

export const PlanService = new PlanServiceApi(API_SERVICES.PLAN);
