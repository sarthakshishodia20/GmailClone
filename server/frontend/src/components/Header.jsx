import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import { Menu as MenuIcon, Search, Tune, HelpOutlined, SettingsOutlined, AppsOutlined, AccountCircleOutlined } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { gmaillogo } from "../constants/constant.js";

const StyledAppBar = styled(AppBar)({
    background: "#131313",
    boxShadow: "none",
    color: "white",
});

const SearchContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: "5px",
    padding: "5px 10px",
    border: "1px solid white",
    width: "50%",
    margin: "0 auto",
});

const StyledInputBase = styled(InputBase)({
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    width: "100%",
    "& .MuiInputBase-input": {
        color: "white",
        "::placeholder": {
            color: "white",
            opacity: 1,
        },
    },
});

const Header = ({ setOpen }) => {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <IconButton onClick={() => setOpen((prev) => !prev)} color="inherit">
                    <MenuIcon />
                </IconButton>
                <img
                    src={gmaillogo}
                    alt="Gmail Logo"
                    style={{
                        width: "150px",
                        height: "40px",
                        borderRadius: "5px",
                        marginLeft: "10px",
                        boxShadow: "2px 2px 8px white",
                    }}
                />
                <SearchContainer>
                    <Search style={{ color: "white" }} />
                    <StyledInputBase placeholder="Search mail" />
                    <Tune style={{ color: "white" }} />
                </SearchContainer>
                <div>
                    <HelpOutlined style={{ color: "white", marginLeft: "10px" }} />
                    <SettingsOutlined style={{ color: "white", marginLeft: "10px" }} />
                    <AppsOutlined style={{ color: "white", marginLeft: "10px" }} />
                    <AccountCircleOutlined style={{ color: "white", marginLeft: "10px" }} />
                </div>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header;
