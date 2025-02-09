import React from 'react';
import { Dialog, DialogContent, InputBase, Button, styled, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Close, DeleteOutlined } from '@mui/icons-material';
import { useState } from 'react';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    background: 'gray',
    '& > p': {
        fontSize: 14,
        fontWeight: 600
    }
});

const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    textAlign: 'center'
});

const SendButton = styled(Button)({
    background: '#000000',
    color: '#fff',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px 2px black',
    border: '2px solid white',
    textTransform: 'none',
    fontWeight: 'bold',
    width: '100px',
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
    const [data, setData] = useState({});
    const sentEmailService=useApi(API_URLS.saveSentEmail);
    const saveDraftService =useApi(API_URLS.saveDraftEmails);

    const config = {
        Host: "smtp.elasticemail.com",
        Username: process.env.REACT_APP_USERNAME,
        Password: process.env.REACT_APP_PASSWORD,
        Port: 587,
    };

    const handleClose = (e) => {
        e.preventDefault();
        const payload={
            to:data.to,
            from:'sarthakshishodia2004@gmail.com',
            subject:data.subject,
            body:data.body,
            date:new Date(),
            image:'',
            name:'Sarthak Shishodia',
            starred:false,
            type:'drafts',
        }
        saveDraftService.call(payload);

        if(!saveDraftService.error){
            setOpenDialog(false);
            setData();
        }
        else{

        }
    };

    const sendMail = (e) => {
        e.preventDefault();
        if (window.Email) {
            window.Email.send({
                ...config,
                To: data.to,
                From: 'sarthakshishodia2004@gmail.com',
                Subject: data.subject,
                Body: data.body
            }).then(
                message => alert(message)
            );
        }

        const payload={
            to:data.to,
            from:'sarthakshishodia2004@gmail.com',
            subject:data.subject,
            body:data.body,
            date:new Date(),
            image:'',
            name:'Sarthak Shishodia',
            starred:false,
            type:'sent',
        }
        sentEmailService.call(payload);

        if(!sentEmailService.error){
            setOpenDialog(false);
            setData();
        }
        else{

        }
        setOpenDialog(false);
    };

    const onValueChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
        console.log(data);

    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-paper": {
                    height: "90%",
                    width: "90%",
                    maxWidth: "none",
                    maxHeight: "none",
                    borderRadius: "10px 10px 0 0",
                }
            }}
        >
            <DialogContent>
                <Header>
                    <Typography component="div">New Message</Typography>
                    <IconButton onClick={handleClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </Header>
                <Box sx={{ padding: "10px" }}>
                    <InputBase
                        placeholder="Recipients"
                        name='to'
                        onChange={(e) => onValueChange(e)}
                        fullWidth
                        sx={{ marginBottom: "10px", borderBottom: "1px solid gray" }}
                    />
                    <InputBase
                        placeholder="Subject"
                        fullWidth
                        name='subject'
                        onChange={(e) => onValueChange(e)}
                        sx={{ marginBottom: "10px", borderBottom: "1px solid gray" }}
                    />
                </Box>
                <TextField
                    multiline
                    rows={15}
                    fullWidth
                    name='body'
                    onChange={(e) => onValueChange(e)}
                    sx={{
                        backgroundColor: "lightgray",
                        color: "black",
                        padding: "10px",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                        },
                        "& .MuiInputBase-input": {
                            color: "black",
                        },
                    }}
                />
                <Footer>
                    <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
                    <IconButton>
                        <DeleteOutlined onClick={handleClose} />
                    </IconButton>
                </Footer>
            </DialogContent>
        </Dialog>
    );
};

export default ComposeMail;
