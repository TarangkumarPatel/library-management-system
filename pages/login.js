import { useState } from "react";
import { useRouter } from "next/router";
import { Card, Form, Alert, Button, Row, Col } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { authenticateUser } from "../lib/authenticate";
import { getFavourites } from "../lib/userData";
import Link from "next/link";

export default function Login(props) {
  // 1. Setup state for the form inputs and error messages
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();

  // 2. Reference the favouritesAtom using the useAtom hook
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  // 3. Create the required asynchronous function to update the atom
  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  // 4. Handle the form submission
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Authenticate the user via our library
      await authenticateUser(user, password);

      // Update the favourites atom with data from the back end
      await updateAtom();

      // Redirect to the home page
      router.push("/");
    } catch (err) {
      // Display the error in our Alert component
      setWarning(err.message);
    }
  }

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6} xl={5}>
        <Card className="auth-card p-4 p-md-5 fade-in-up">
          <div className="text-center mb-4">
            <span className="eyebrow mb-2">Welcome back</span>
            <h1 className="h2 gradient-text mt-2 mb-1">Login</h1>
            <p className="text-muted-soft mb-0">Enter your credentials to access your favourites.</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                id="userName"
                name="userName"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {warning && (
              <Alert variant="danger" className="mb-3">{warning}</Alert>
            )}

            <Button variant="primary" type="submit" className="w-100 py-2 fs-5">
              Login
            </Button>

            <p className="text-center mt-4 mb-0 text-muted-soft">
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </p>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
