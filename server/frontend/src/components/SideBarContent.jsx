import { Box, Button, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import { SIDEBAR_DATA } from "../config/Sidebar.config";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ComposeMail from "./ComposeMail";
import { useState} from "react";
import {useParams,NavLink} from "react-router-dom";
import {routes} from '../routes/routes';

const ComposeButton = styled(Button)({
    background: "#ffffff",
    color: "black",
    padding: "10px 20px",
    marginLeft: "10px",
    marginTop: "10px",
    borderRadius: "15px",
    fontWeight: "bold",
    minWidth: "100px",
    textTransform: "none",
    boxShadow: "2px 2px 3px 3px white",
});

const Container = styled(Box)({
    padding: "10px",
    "&> ul": {
        padding: "10px 0 0 5px",
        fontSize: "15px",
        fontWeight: "bold",
        margin: "0",
        cursor: "pointer",
        listStyle: "none",
        '& > a':{
            textDecoration: 'none',
            color:'inherit',
        }
    },
    "&> ul> li": {
        padding: "10px",
        borderBottom: "1px solid lightgray",
        "&:hover": {
            backgroundColor: "#000000",
        },
    },
    "&> ul> li> .MuiListItemIcon-root": {
        minWidth: "30px",
        color: "white",
    },
    "&> ul> li> .MuiListItemText-root": {
        fontSize: "15px",
    },
});

const SideBarContent = () => {
    const [openDialog, setOpenDialog] = useState(false);


    const {type}=useParams();

    const onComposeClick = () => {
        setOpenDialog(true);
    };

    return (
        <Container>
            <ComposeButton onClick={onComposeClick}>
                <CreateOutlined sx={{ color: "black" }} /> Compose
            </ComposeButton>
            <List>
                {SIDEBAR_DATA.map((item, index) => (
                    <NavLink to={`${routes.emails.path}/${item.name}`}>
                    <ListItem button key={index} style={type===item.name.toLowerCase()?{
                        backgroundColor:"#234567",
                        borderRadius:"12px 0 12px 0",
                    }:{}} >
                        <ListItemIcon sx={{ color: "white" }}>
                            {item.icon && <item.icon />}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                    </NavLink>
                ))}
            </List>
            <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Container>
    );
};

export default SideBarContent;
