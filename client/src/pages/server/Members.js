import React from "react";

const Members = ({ server, isAdmin, owner }) => {
    return (
        <div>
            <div style={{ fontSize: 18, color: "lightgrey", margin: 5 }}>
                Members:
            </div>
            <div style={{ marginLeft: 10, margin: 5 }}>
                {server.members &&
                    server.members.map((member) => (
                        <div
                            style={{
                                color: isAdmin(owner, member._id)
                                    ? "red"
                                    : "white",
                            }}
                            key={member._id}
                        >
                            {member.username}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Members;
