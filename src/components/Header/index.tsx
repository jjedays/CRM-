import React, { useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { FaHamburger } from "react-icons/fa";

export const Header = () => {
  const [showNavExternal, setShowNavExternal] = useState(false);

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
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Features</Nav.Link>
            <Nav.Link>Pricing</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
