import React from "react";
import { GalleryService } from "./galleryService";
import { GroupService } from "./groupService";
import { UserService } from "./userService";

export const service = React.createContext({
    groupService: new GroupService(),
    userService: new UserService(),
    galleryService: new GalleryService()
})