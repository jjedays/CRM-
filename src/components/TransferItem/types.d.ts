import { ITransfer } from "../../models/transfer";

export interface ITransferItemProps {
  transfer: ITransfer;
  canDelete?: boolean;
  reload: () => void;
}
