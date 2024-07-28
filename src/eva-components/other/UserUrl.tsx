import React from 'react';
import { Text } from 'rizzui';

const UserUrl = ({ url }: { url: string }) => {
  return (
    <div>
      {url ? (
        <a
          href={url}
          target="_blank"
          // rel="noopener noreferrer"
          className="text-lightBlack line-clamp-1 underline"
        >
          {url}
        </a>
      ) : (
        <Text className="text-sm">-</Text>
      )}
    </div>
  );
};

export default UserUrl;
