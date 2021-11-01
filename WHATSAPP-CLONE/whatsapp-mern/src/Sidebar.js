import React from 'react'; 
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from "@material-ui/icons/Chat";
import MoreVerIcon from "@material-ui/icons/MoreVert";
import{ SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <Avatar src="https://images.unsplash.com/photo-1518478164902-9e0290e8d7d8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60" />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVerIcon />
                    </IconButton>

                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
            <SearchOutlined />
            <input placeholder="Search or start new chat" type="text" />
            </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    );
}

export default Sidebar;
