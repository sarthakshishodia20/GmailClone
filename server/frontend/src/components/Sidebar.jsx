import { Drawer } from "@mui/material";
import SideBarContent from "./SideBarContent";

const Sidebar = ({ open }) => {
    return (
        <Drawer
            anchor="left"
            open={open}
            hideBackdrop={true}
            variant="persistent"
            sx={{
                width: open ? "240px" : "0px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "240px",
                    boxSizing: "border-box",
                    background: "#232323",
                    border: "none",
                    color: "white",
                    marginTop: "64px",
                    height: "calc(100%-64px)",
                    transition: "width 0.3s ease-in-out"
                }
            }}
        >
            {open && <SideBarContent />}
        </Drawer>
    );
};

export default Sidebar;
