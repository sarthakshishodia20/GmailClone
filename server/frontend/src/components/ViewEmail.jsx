import { Box, Typography, styled } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constant';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const IconWrapper = styled(Box)({
    padding: '15px',
});

const Container = styled(Box)({
    marginLeft: 15,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
});

const FullEmailBody = styled(Box)({
    backgroundColor: '#234567', // Apply background color to full email body except subject
    padding: '20px',
    cursor:'pointer',
    width:'200%',
    borderRadius: '10px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.8)', // Enhanced shadow
    color: 'white',
    transition: 'all 0.1s ease-in-out',
    '&:hover': {
        backgroundColor: 'transparent',
        border: '4px solid #234567',
    }
});

const Wrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between', // Pushes date to the right
    width: '100%',
    alignItems: 'center',
    '& > p span': {
        fontSize: 13,
        color: 'lightgray',
    }
});

const DateContainer = styled(Box)({
    color: 'lightgray',
    marginLeft: 'auto',
});

const Indicator = styled(Box)({
    fontSize: 13,
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    boxShadow: '1px 2px 2px 2px white',
    borderRadius: '10%',
    cursor: 'pointer',
    padding: '2px 4px',
    marginLeft: '8px',
    alignSelf: 'center',
});

const Subject = styled(Typography)({
    fontSize: 28,
    margin: '10px 0 20px 75px',
    display: 'flex'
});

const EmailBody = styled(Typography)({
    fontSize: 20,
    marginTop: '10px',
    whiteSpace: 'pre-wrap',
    padding: '15px',
});

const ViewEmail = () => {
    const { state } = useLocation();
    const { email } = state;

    const moveEmailsToBinService=useApi(API_URLS.moveEmailsToBin);


    const deleteEmail = async () => {
        await moveEmailsToBinService.call({ emails: [email._id], permanent: false });
        window.history.back();
    };
    

    return (
        <Box style={{ padding: "10px" }}>
            <IconWrapper>
                <ArrowBack onClick={() => window.history.back()} fontSize='small' style={{ color: 'white', cursor: 'pointer' }} />
                <Delete style={{ marginLeft: '40px',cursor:'pointer' }} onClick={()=>deleteEmail()} />
            </IconWrapper>
            <Subject>
                {email.subject}
                <Indicator component='span'>inbox</Indicator>
            </Subject>
            <FullEmailBody>
                <Container>
                    <img src={emptyProfilePic} alt='dp' style={{ height: '40px', width: '40px', borderRadius: '50%', boxShadow: '-2px -2px 10px 5px #1A2B3C', marginRight: '10px' }} />
                    <Wrapper>
                        <Typography>
                            {email.name}
                            <Box component='span'>&nbsp;&#60;{email.to}&#62;</Box>
                        </Typography>
                        <DateContainer>
                            {(() => {
                                let validDate;
                                if (email.Date && !isNaN(new Date(email.Date).getTime())) {
                                    validDate = new Date(email.Date);
                                } else {
                                    validDate = new Date();
                                }
                                return `${validDate.getDate()} ${validDate.toLocaleString('default', { month: 'long' })} ${validDate.getFullYear()}`;
                            })()}
                        </DateContainer>
                    </Wrapper>
                </Container>
                <EmailBody>{email.body}</EmailBody>
            </FullEmailBody>
        </Box>
    );
};

export default ViewEmail;