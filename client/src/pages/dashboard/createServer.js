import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createServerAction } from "../../store/actions/serverActions";

const CreateServer = () => {
    const dispatch = useDispatch();
    const userid = useSelector((state) => state.user.profile._id);

    const [serverDetails, setserverDetails] = useState({
        name: "",
        isPrivate: false,
        owner: userid,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createServerAction(serverDetails));
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
