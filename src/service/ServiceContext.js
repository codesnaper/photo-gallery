import React from "react";
import { GroupService } from "./groupService";
import { UserService } from "./userService";

export const service = React.createContext({
    groupService: new GroupService(),
    userService: new UserService()
})