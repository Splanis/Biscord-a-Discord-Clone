import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { logoutAction } from "../../store/actions/userActions";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    return null;
};

export default Logout;
