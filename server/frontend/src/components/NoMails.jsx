import { Box, Typography, styled } from '@mui/material';
import Divider from '@mui/material/Divider';

const Component = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '50px',
    opacity: '0.8',
    width: '100%',
});

const StyledDivider = styled(Divider)({
    width: '100%',
    marginTop: 10,
    backgroundColor: 'white', // Ensuring white color for the divider
});

const NoMails = ({ message }) => {
    return (
        <Component>
            <Typography>{message.heading}</Typography>
            <Typography>{message.subHeading}</Typography>
            <StyledDivider />
        </Component>
    );
};

export default NoMails;
