import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import {useDispatch, useSelector } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { logout } from "../../Actions/userAction";

const Header = ({setSearch}) => {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin;
  const history = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  }
  
  return (
    <>
      {userInfo ? <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>MakeNotes</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/mynotes" style={{ textDecoration: "none" }}>
                <Nav.Link href="#action1">My Notes</Nav.Link>
              </Link>
            </Nav>
            <Nav className="md-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>
            <Nav>
              <NavDropdown
                title={userInfo && userInfo.name}
                id="basic-nav-dropdown"
                className="mx-5"
                style={{textTransform : "capitalize"}}
              >
                <NavDropdown.Item href="/profile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick= {
                    logoutHandler
                  }
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> : <Nav>

      </Nav>}
    </>
  );
};

export default Header;
