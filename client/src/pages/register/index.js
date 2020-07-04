import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { registerAction } from "../../store/actions/userActions";

const Register = () => {
    const [errors, setError] = useState({
        emailError: "",
        passwordError: "",
    });
    const { emailError, passwordError } = errors;

    const [credentials, setCredentials] = useState({
        email: "",
        username: "",
        password: "",
        password2: "",
    });
    const { email, password, password2, username } = credentials;

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === password2) {
            dispatch(registerAction(credentials));
        } else {
            setError({
                emailError: "",
                passwordError: "Passwords does not match",
            });
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>email</label>
                <input
                    type="text"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            email: e.target.value,
                        })
                    }
                />
                <label>username</label>
                <input
                    type="text"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            username: e.target.value,
                        })
                    }
                />
                <label>password</label>
                <input
                    type="password"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password: e.target.value,
                        })
                    }
                />
                <label>password2</label>
                <input
                    type="password"
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password2: e.target.value,
                        })
                    }
                />
                <button type="submit">Register</button>
            </form>
            <p>
                If you have an account, <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
