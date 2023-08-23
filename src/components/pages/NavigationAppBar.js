import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { MOBILE_MAX_WIDTH } from '../../utils/constants';
import useMediaQuery from '@mui/material/useMediaQuery';

function NavigationAppBar({ hideChat, handleShowAttendee, enteredChannel }) {
  const onClickMenuButton = (e) => {
    e.stopPropagation();
    hideChat();
  };

  const onClickAttendeeButton = (e) => {
    e.stopPropagation();
    handleShowAttendee();
  };

  const isSmallScreen = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH}px)`);

  return (
    <AppBar
      position="static"
      color="transparent"
      style={{ height: '36px', paddingTop: 0, paddingBottom: 0 }}
    >
      <Toolbar style={{ minHeight: '36px' }}>
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onClickMenuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        {enteredChannel && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="attendee"
            onClick={onClickAttendeeButton}
            style={{ marginLeft: 'auto' }}
          >
            <PeopleOutlineIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavigationAppBar;
