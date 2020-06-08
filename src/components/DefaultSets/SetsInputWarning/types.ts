export interface SetsInputWarningData {
  title: string;
  body: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export interface Props {
  isVisible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setParentVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  data?: SetsInputWarningData;
  callback: () => void;
}
