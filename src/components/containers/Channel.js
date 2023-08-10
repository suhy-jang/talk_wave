import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { removeToken } from '../../utils/auth';

function Channel() {
  const { user, setUser } = useAuth();

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[calc(100%-52px)]">channel</div>
      <div className="h-[52px] bg-coolGray-900">
        {user ? <div>{user.username}</div> : null}
        <div onClick={logout}>logout</div>
      </div>
    </div>
  );
}

export default Channel;
