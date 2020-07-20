import React from "react";

const Members = ({ server, isAdmin, owner, toggleMembers }) => {
    return (
        <div
            style={{
                flex: 1,
                background: "#292929",
                width: "100%",
                display: !toggleMembers && "none",
                overflowY: "scroll",
                paddingTop: "45px",
                paddingLeft: 5,
            }}
        >
            {server.members &&
                server.members.map((member) => (
                    <div
                        style={{
                            color: isAdmin(owner, member._id) ? "red" : "white",
                        }}
                        key={member._id}
                    >
                        {member.username}
                    </div>
                ))}
        </div>
    );
};

export default Members;
