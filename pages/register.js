import { useState } from "react";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { registerUser } from "../lib/authenticate";

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); // Added for confirm password
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState(false); // To show a green success message
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning(""); // Clear previous errors

    // 1. Check if passwords match locally
    if (password !== password2) {
      setWarning("Passwords do not match");
      return;
    }

    // 2. Validate Password Strength
    // Requirements: Min 8 chars, 1 Uppercase, 1 Number, 1 Special Char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setWarning(
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character[@$!%*?&].",
      );
      return;
    }

    try {
      // 3. If validation passes, attempt registration
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>Enter your information below to create a new account:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            id="userName"
            name="userName"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            id="password2"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
        {success && (
          <>
            <br />
            <Alert variant="success">
              User created successfully! Redirecting to login...
            </Alert>
          </>
        )}

        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
