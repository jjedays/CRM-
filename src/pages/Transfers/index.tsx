import { Accordion } from "react-bootstrap";
import { AddTransferForm, Error, TransferItem } from "../../components";
import { IUser } from "../../models/user";
import { useEffect, useState } from "react";
import { getAllUserDocuments } from "../../utils/firebase/admin";
import { Oval } from "react-loader-spinner";
import { ITransfer } from "../../models/transfer";
import { getAllTransferDocuments } from "../../utils/firebase/transfers";

export const Transfers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [transfers, setTransfers] = useState<ITransfer[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reload = () => {
    getAllTransferDocuments()
      .then((data) => {
        setTransfers(data as ITransfer[]);
      })
      .catch((err) => {
        setError(err.code);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllUserDocuments()
      .then((data) => {
        setUsers(data as IUser[]);
        reload();
      })
      .catch((err) => {
        setError(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <h1 className="mb-4">Edit and read current transfers</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add new transfer</Accordion.Header>
          <Accordion.Body>
            <AddTransferForm users={users} reload={reload} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
    </div>
  );
};
