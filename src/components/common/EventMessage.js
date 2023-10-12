import React from 'react';

function EventMessage({ event }) {
  return (
    <div className="flex justify-center">
      <div className="bg-coolGray-300 text-coolGray-800 text-sm rounded p-1 min-w-[250px] break-words break-all">
        {event}
      </div>
    </div>
  );
}

export default React.memo(EventMessage);
