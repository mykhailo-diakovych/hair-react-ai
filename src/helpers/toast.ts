import {
  Id,
  ToastOptions,
  ToastProps,
  UpdateOptions
} from "react-toastify/dist/types";
import { toast } from "react-toastify";

export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark"
};

export class Toast {
  public static success(message: string, config?: Partial<ToastProps>): Id {
    return toast.success(message, {
      ...DEFAULT_TOAST_OPTIONS,
      ...config
    });
  }

  public static error(message: string, config?: Partial<ToastProps>): Id {
    return toast.error(message, {
      ...DEFAULT_TOAST_OPTIONS,
      autoClose: 5000,
      ...config
    });
  }

  public static update<TData = unknown>(
    id: Id,
    options?: UpdateOptions<TData>
  ): void {
    return toast.update(id, options);
  }
}
