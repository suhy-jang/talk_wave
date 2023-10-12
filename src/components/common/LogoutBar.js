import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutBar = ({ user, logout }) => {
  return (
    <div className="flex flex-row items-center justify-between px-4 h-logoutBar bg-coolGray-900">
      {user ? <div>{user.name}</div> : null}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="logout"
        onClick={logout}
      >
        <LogoutIcon />
      </IconButton>
    </div>
  );
};

export default LogoutBar;
