import React from 'react';
import { convertToKoreanTime } from '../../utils/convertTime';

function CurrentUserMessage({ timestamp, content }) {
  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-row">
        <div>
          <div className="flex justify-end items-end gap-4">
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

export default CurrentUserMessage;
