import { useState } from "react";
import { useRouter } from "next/router";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { authenticateUser } from "../lib/authenticate";
import { getFavourites } from "../lib/userData";

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
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            id="userName"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* 5. Implement the Alert to show errors if they exist */}
        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
