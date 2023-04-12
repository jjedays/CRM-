import { useEffect, useState } from "react";
import { IUser } from "../../models/user";
import { getAllUserDocuments } from "../../utils/firebase/admin";
import { UserListItem, Error } from "../../components";
import { Oval } from "react-loader-spinner";

export const Admin = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getAllUserDocuments()
      .then((data) => {
        setUsers(data as IUser[]);
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
    <div className="gap-2 d-flex flex-column">
      {users.map((user) => {
        return <UserListItem {...user} key={user.user} />;
      })}
    </div>
  );
};
