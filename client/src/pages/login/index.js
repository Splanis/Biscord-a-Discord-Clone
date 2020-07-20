import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/userActions";

import {
    Button,
    Container,
    FormGroup,
    Input,
    InputLabel,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

const Login = () => {
    const [errors, setError] = useState({
        emailError: "",
        passwordError: "",
    });
    const { emailError, passwordError } = errors;

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { email, password } = credentials;

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction(credentials));
    };

    return (
        <Container maxWidth="sm">
            <h1 style={{ margin: "20px 0" }}>Login</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <InputLabel labelhtmlFor="email">Email</InputLabel>
                    <Input
                        style={{ margin: "20px 0" }}
                        id="email"
                        type="text"
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                email: e.target.value,
                            })
                        }
                    />
                    <InputLabel labelhtmlFor="password">Password</InputLabel>
                    <Input
                        style={{ margin: "20px 0" }}
                        id="password"
                        type="password"
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })
                        }
                    />
                    <Button color="primary" variant="contained" type="submit">
                        Login
                    </Button>
                </FormGroup>
            </form>
            <p>
                Don't have an account? Register <Link to="/register">Here</Link>
            </p>
        </Container>
    );
};

export default Login;
