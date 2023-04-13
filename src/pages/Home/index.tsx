import { Oval } from "react-loader-spinner";
import { ITransfer } from "../../models/transfer";
import { useEffect, useState } from "react";
import { Error, TransferItem } from "../../components";
import { getAllTransferDocuments } from "../../utils/firebase/transfers";
import Lottie from "lottie-react";
import animation from "../../animations/no-items.json";

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
    <div>
      <h1 className="mb-4">Current transfers</h1>
      <div className="gap-2 d-flex flex-column">
        {transfers.length ? (
          transfers.map((transfer) => {
            return (
              <TransferItem
                key={transfer.transferId}
                transfer={transfer}
                reload={reload}
              />
            );
          })
        ) : (
          <div className="vh-100 d-flex flex-column justify-content-center">
            <Lottie
              animationData={animation}
              loop={true}
              className="w-50 h-50 mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};
