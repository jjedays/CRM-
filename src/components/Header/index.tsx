import React, { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { FaHamburger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStoreState } from "../../store/hooks";
import { adminEmail } from "../../configs/firebase";

export const Header = () => {
  const [showNavExternal, setShowNavExternal] = useState(false);
  const navigate = useNavigate();
  const { user } = useStoreState((state) => state);

  const linkClickHandler = (to: string) => {
    navigate(to);
    setShowNavExternal(false);
  };

  return (
    <>
      <header className="bg-primary p-2 d-flex align-items-center">
        <Button
          className="justify-content-center align-items-center"
          onClick={() => setShowNavExternal(!showNavExternal)}
          variant="light"
        >
          <FaHamburger size={25} />
        </Button>
      </header>
      <Offcanvas show={showNavExternal} onHide={setShowNavExternal}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CRM options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="d-flex flex-column">
            <Nav.Link onClick={() => linkClickHandler("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => linkClickHandler("/auth")}>Auth</Nav.Link>
            <Nav.Link onClick={() => linkClickHandler("/profile")}>
              Profile
            </Nav.Link>
            {user?.email === adminEmail && (
              <>
                <Nav.Link onClick={() => linkClickHandler("/transfers")}>
                  Set transfers
                </Nav.Link>
                <Nav.Link onClick={() => linkClickHandler("/admin")}>
                  Set users
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
