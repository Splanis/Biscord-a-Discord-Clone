import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createServerAction } from "../../store/actions/serverActions";
import { fetchUserServersAction } from "../../store/actions/userActions";

const CreateServer = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.profile._id);
    const auth_token = useSelector((state) => state.user.auth_token);

    const [serverDetails, setserverDetails] = useState({
        name: "",
        isPrivate: false,
        owner: userId,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createServerAction({ serverDetails, auth_token }));
        dispatch(fetchUserServersAction({ auth_token, userId }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Server name:</label>
                <input
                    type="text"
                    onChange={(e) =>
                        setserverDetails({
                            ...serverDetails,
                            name: e.target.value,
                        })
                    }
                />
                <label>Private:</label>
                <input
                    type="checkbox"
                    onChange={() =>
                        setserverDetails({
                            ...serverDetails,
                            isPrivate: !serverDetails.isPrivate,
                        })
                    }
                />
                <button type="submit">Create Server</button>
            </form>
        </div>
    );
};

export default CreateServer;
