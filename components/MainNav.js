import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { readToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";
import { BookIcon } from "@/components/Icons";

export default function MainNav() {
  const router = useRouter();

  // 1. Get the current value of the token to customize the UI
  let token = readToken();

  // 2. Define the logout function
  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <Navbar className="site-navbar" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/" className="brand-mark">
          <span className="brand-badge">
            <BookIcon />
          </span>
          Shelfwise
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link>About</Nav.Link>
            </Link>
            {/* Only show Favourites here if NOT logged in (or as per Step 6, move it to dropdown) */}
            {!token && (
              <Link href="/favourites" passHref legacyBehavior>
                <Nav.Link>Favourites</Nav.Link>
              </Link>
            )}
          </Nav>

          {/* Step 6: Conditional UI based on Token */}
          {token ? (
            <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link>Login</Nav.Link>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
