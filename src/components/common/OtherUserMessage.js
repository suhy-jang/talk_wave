import React from 'react';
import { convertToKoreanTime } from '../../utils/convertTime';

function OtherUserMessage({ creator, timestamp, content }) {
  return (
    <div>
      <div className="flex flex-row">
        <div>{/* TODO: profile */}</div>
        <div>
          <div className="flex items-end gap-4">
            <div className="text-sm">{creator.name}</div>
            <div className="text-xs">{convertToKoreanTime(timestamp)}</div>
          </div>
          <div className="bg-highlightPurple inline-block rounded-lg p-2 min-w-[250px] break-words break-all">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(OtherUserMessage);
