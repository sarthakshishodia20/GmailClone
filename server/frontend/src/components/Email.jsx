import { Checkbox } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const Wrapper = styled(Box)({
    padding: '10px',
    background: '#234567',
    cursor: 'pointer',
    borderRadius: '10px',
    boxShadow: '4px 2px 10px 2px #234567',
    border: '1px solid white',
    display: 'flex',
    alignItems: 'center',
    width: '240%',
    maxWidth: '1200px',
    margin: '8px auto',
    transition: 'background 0.3s, box-shadow 0.3s',

    '&:hover': {
        background: 'transparent',
        boxShadow: '4px 2px 10px 2px #234567',
    }
});

const ClickableBox = styled(Box)({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    cursor: 'pointer',
});

const InboxTag = styled(Typography)({
    fontSize: '14px',
    background: '#fff', 
    color: 'black',
    padding: '4px 8px',
    borderRadius: '4px',
    marginLeft: '10px',
});

const DateTag = styled(Typography)({
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
});

const Email = ({ email, selectedEmails, toggleEmailSelection, setRefreshScreen }) => {
    const navigate = useNavigate();
    const toggleStarredService = useApi(API_URLS.toggleStarredEmail);

    const toggleStarredMails = () => {
        toggleStarredService.call({ id: email._id, value: !email.starred });
        setRefreshScreen(prevState => !prevState);
    };

    return (
        <Wrapper>
            <Checkbox 
                size="small" 
                style={{ color: 'white' }}
                checked={selectedEmails.includes(email._id)} 
                onChange={() => toggleEmailSelection(email._id)}
            />
            {email.starred ? (
                <Star fontSize="small" style={{ marginRight: 10, color: '#efc660' }} onClick={toggleStarredMails} />
            ) : (
                <StarBorder fontSize="small" style={{ marginRight: 10, color: 'white' }} onClick={toggleStarredMails} />
            )}
            <ClickableBox onClick={() => navigate(routes.view.path, { state: { email } })}>
                <Typography style={{ paddingLeft: '10px', color: 'white' }}>{email.name}</Typography>
                <InboxTag>Inbox</InboxTag>
                <Typography style={{ flex: 2, textAlign: 'center', color: 'white' }}>
                    {email.subject} {email.body && ` - ${email.body}`}
                </Typography>
                <DateTag>
                    {new Date(email.date).getDate()}/{new Date(email.date).getMonth() + 1}/{new Date(email.date).getFullYear()}
                </DateTag>
            </ClickableBox>
        </Wrapper>
    );
};

export default Email;