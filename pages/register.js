import { useState } from "react";
import { Card, Form, Alert, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { registerUser } from "../lib/authenticate";
import Link from "next/link";

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
    <Row className="justify-content-center">
      <Col md={8} lg={6} xl={5}>
        <Card className="auth-card p-4 p-md-5 fade-in-up">
          <div className="text-center mb-4">
            <span className="eyebrow mb-2">Join us</span>
            <h1 className="h2 gradient-text mt-2 mb-1">Register</h1>
            <p className="text-muted-soft mb-0">Create an account to start saving your favourite books.</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                value={user}
                id="userName"
                name="userName"
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                id="password2"
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>

            {warning && (
              <Alert variant="danger" className="mb-3">{warning}</Alert>
            )}
            {success && (
              <Alert variant="success" className="mb-3">
                User created successfully! Redirecting to login...
              </Alert>
            )}

            <Button variant="primary" type="submit" className="w-100 py-2 fs-5">
              Register
            </Button>

            <p className="text-center mt-4 mb-0 text-muted-soft">
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
