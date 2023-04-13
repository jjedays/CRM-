import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IUser } from "../../models/user";
import { setUserRole } from "../../utils/firebase/admin";
import { cutStr } from "../../utils/strings";
import { Role } from "../../types/role";

export const UserListItem: React.FC<IUser> = ({
  age,
  displayName,
  bio,
  role,
  user,
}) => {
  const [currentRole, setCurrentRole] = useState<Role>(role);

  const setRole = (role: Role) => {
    setCurrentRole(role);
    setUserRole(user, role);
  };

  return (
    <div className="py-4 px-2 p-xl-4 border border-primary bg-primary rounded bg-opacity-10 row align-items-center">
      <div className="col">Name: {displayName || "Unknown"}</div>
      <div className="col d-none d-xl-block">Age: {age || "Unknown"}</div>
      <div className="col-6 d-none d-xl-block">
        Bio: {bio ? cutStr(bio, 50) : "Unknown"}
      </div>
      <div className="d-flex align-items-center gap-2 col justify-content-end">
        Role:
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {currentRole || "No role"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setRole("Driver")}>
              Driver
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setRole("Passenger")}>
              Passenger
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setRole("Dispatch")}>
              Dispatch
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
