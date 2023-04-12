import { Button } from "react-bootstrap";
import { ITransferItemProps } from "./types";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteTransferDocument } from "../../utils/firebase/transfers";
import { getUserDocument } from "../../utils/firebase/user";
import { useEffect, useState } from "react";
import { IUser } from "../../models/user";
import { Oval } from "react-loader-spinner";
import { cutStr } from "../../utils/strings";

export const TransferItem: React.FC<ITransferItemProps> = ({
  transfer,
  canDelete,
  reload,
}) => {
  const [dispatchData, setDispatchData] = useState<IUser | null>(null);
  const [driverData, setDriverData] = useState<IUser | null>(null);

  const { destination, passengers, dispatch, driver, startPoint, transferId } =
    transfer;
  const deleteHandler = () => {
    deleteTransferDocument(transferId).then(reload);
  };

  useEffect(() => {
    getUserDocument(dispatch.id).then((data) => {
      setDispatchData(data as IUser);
    });
    getUserDocument(driver.id).then((data) => {
      setDriverData(data as IUser);
    });
  }, [dispatch.id, driver.id]);

  return (
    <div className="py-4 px-2 p-xl-4 border border-primary bg-primary rounded bg-opacity-10 row align-items-center">
      <div className="col">
        {startPoint} - {destination}
      </div>
      <div className="col d-none d-xl-flex align-items-center">
        Dispatch:{" "}
        {dispatchData ? (
          cutStr(dispatchData.displayName || dispatchData.user, 10)
        ) : (
          <Oval
            height={20}
            width={20}
            color="white"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#505050"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
      </div>
      <div className="col d-none d-xl-flex align-items-center">
        Driver:{" "}
        {driverData ? (
          cutStr(driverData.displayName || driverData.user, 10)
        ) : (
          <Oval
            height={20}
            width={20}
            color="white"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#505050"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        )}
      </div>
      <div className="col">{passengers.length} Passengers</div>

      {canDelete && (
        <div className="d-flex align-items-center gap-2 col-1 justify-content-end">
          <Button variant="danger" onClick={deleteHandler}>
            <AiOutlineDelete size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};
