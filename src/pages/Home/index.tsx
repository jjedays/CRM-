import { Oval } from "react-loader-spinner";
import { IUser } from "../../models/user";
import { ITransfer } from "../../models/transfer";
import { useEffect, useState } from "react";
import { Error, TransferItem } from "../../components";
import { getAllTransferDocuments } from "../../utils/firebase/transfers";
import { getAllUserDocuments } from "../../utils/firebase/admin";

export const Home = () => {
  const [transfers, setTransfers] = useState<ITransfer[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reload = () => {
    setIsLoading(true);
    getAllTransferDocuments()
      .then((data) => {
        setTransfers(data as ITransfer[]);
      })
      .catch((err) => {
        setError(err.code);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  if (error) return <Error errorText={error} />;
  if (isLoading)
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <Oval
          height={50}
          width={50}
          color="white"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#505050"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  return (
    <div className="gap-2 d-flex flex-column mt-4">
      {transfers.map((transfer) => {
        return (
          <TransferItem
            key={transfer.transferId}
            transfer={transfer}
            canDelete={true}
            reload={reload}
          />
        );
      })}
    </div>
  );
};
