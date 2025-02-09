import { useOutletContext, useParams } from "react-router-dom";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";
import { Checkbox, Box, List } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from "./NoMails";
import { EMPTY_TAGS } from "../constants/constant";

const Emails = () => {
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [refreshScreen, setRefreshScreen] = useState(false);

    const { open } = useOutletContext();
    const { type } = useParams();
    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);

    const deleteEmailService=useApi(API_URLS.deleteEmail);
    useEffect(() => {
        getEmailsService.call({}, type);
    }, [type, refreshScreen]);

    const selectAllEmails = (e) => {
        if (e.target.checked) {
            const emails = getEmailsService?.response?.map(email => email._id);
            setSelectedEmails(emails || []);
        } else {
            setSelectedEmails([]);
        }
    };

    const toggleEmailSelection = (emailId) => {
        setSelectedEmails(prevSelected =>
            prevSelected.includes(emailId)
                ? prevSelected.filter(id => id !== emailId)
                : [...prevSelected, emailId]
        );
    };

    const deleteSelectedEmails = () => {
        if(type==='bin'){
            deleteEmailService.call(selectedEmails);
        }
        moveEmailsToBinService.call({
            emails: selectedEmails,
            permanent: type === 'bin'
        });
        setRefreshScreen(prev => !prev);
    };

    return (
        <Box
            style={{
                padding: "20px",
                transition: "margin 0.3s ease-in-out",
                marginLeft: open ? "0px" : "240px"
            }}
        >
            <Box
                style={{
                    padding: "20px 10px 0 10px",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Checkbox size="small" style={{ color: 'white' }} onChange={selectAllEmails} />
                <DeleteOutline onClick={deleteSelectedEmails} />
            </Box>
            <List>
                {getEmailsService?.response?.map((email) => (
                    <Email 
                        key={email._id} 
                        email={email} 
                        selectedEmails={selectedEmails} 
                        setRefreshScreen={setRefreshScreen}
                        toggleEmailSelection={toggleEmailSelection} 
                    />
                ))}
            </List>
            {getEmailsService?.response?.length===0 &&
            <NoMails message={EMPTY_TAGS[type]}/>
            }
        </Box>
    );
};

export default Emails;
