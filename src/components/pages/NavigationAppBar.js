import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MOBILE_MAX_WIDTH } from '../../utils/constants';
import useMediaQuery from '@mui/material/useMediaQuery';

function NavigationAppBar({ hideChat }) {
  const onClickMenuButton = (e) => {
    e.stopPropagation();
    hideChat();
  };

  const isSmallScreen = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH}px)`);

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
}

export default NavigationAppBar;
