export interface IAddTransferFormProps {
  users: IUser[];
  reload: () => void;
}

export interface ITransferData {
  dispatch: IUser | null;
  driver: IUser | null;
  passengers: IUser[] | null;
}
