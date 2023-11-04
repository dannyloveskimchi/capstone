import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';

const ResponsiveBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        marginTop: 50,
    },
    [theme.breakpoints.up('md')]: {
        marginTop: 50,
    },
    [theme.breakpoints.up('lg')]: {
        marginTop: 100,
    }
}));

export default ResponsiveBox