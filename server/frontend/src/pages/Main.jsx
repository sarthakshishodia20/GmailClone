import { Suspense, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import SuspenseLoader from "../components/common/SuspenseLoader";
import { Box, styled } from "@mui/material";

const MainContainer = styled(Box)(({ open }) => ({
    display: "flex",
    transition: "margin 0.3s ease-in-out",
    marginLeft: open ? "20px" : "0px",
    backgroundColor: "#1e1e1e",
    minHeight: "100vh",
    color: "white"
}));

const Main = () => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <Header setOpen={setOpen} />
            <MainContainer open={open}>
                <Sidebar open={open} />
                <Suspense fallback={<SuspenseLoader />}>
                    <Outlet context={{ open }} />
                </Suspense>
            </MainContainer>
        </>
    );
};

export default Main;
