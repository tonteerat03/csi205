import { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { verifyUser } from '../../data/user';

function Login({ setToken, setRole }) {
    const userRef = useRef();
    const passRef = useRef();

    return (
        <div className="login-container">
            <h2 className="login-title">Welcome</h2>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    placeholder="user"
                    ref={userRef}
                    title="Username: user"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder="pass"
                    ref={passRef}
                    title="Username: pass"
                />
            </Form.Group>

            <Button
                className="w-100"
                variant="success"
                onClick={() => {
                    const user = userRef.current.value.trim();
                    const pass = passRef.current.value.trim();
                    userRef.current.value = '';
                    passRef.current.value = '';
                    const userInfo = verifyUser(user, pass);

                    if (userInfo === null) {
                        alert('Wrong username or password');
                        userRef.current.focus();
                    } else {
                        setToken(userInfo.token);
                        setRole(userInfo.role);
                    }
                }}
            >
                Login
            </Button>
        </div>
    );
}

export default Login;
