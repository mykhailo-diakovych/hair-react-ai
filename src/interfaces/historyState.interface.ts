export interface HistoryState<S> {
  history: S[];
  position: number;
  capacity: number;
  back: (amount?: number) => void;
  forward: (amount?: number) => void;
  go: (position: number) => void;
}
