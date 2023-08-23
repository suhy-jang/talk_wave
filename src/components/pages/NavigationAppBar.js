import { useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import { MOBILE_MAX_WIDTH } from '../../utils/constants';

function NavigationAppBar({ hideChat, handleShowAttendee, availableUserList }) {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  const onClickMenuButton = (e) => {
    e.stopPropagation();
    hideChat();
  };

  const onClickAttendeeButton = (e) => {
    e.stopPropagation();
    handleShowAttendee();
    setTooltipOpen(false);
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
        <Tooltip
          title={
            availableUserList
              ? 'View User List'
              : 'User list is disabled in public chat rooms.'
          }
          className="ml-auto"
          open={tooltipOpen}
          onClose={() => setTooltipOpen(false)}
        >
          <span
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
          >
            <IconButton
              edge="end"
              color="inherit"
              aria-label="attendee"
              onClick={onClickAttendeeButton}
              style={{
                color: 'white',
                opacity: availableUserList ? 1 : 0.4,
              }}
              disabled={!availableUserList}
            >
              <PeopleOutlineIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationAppBar;
