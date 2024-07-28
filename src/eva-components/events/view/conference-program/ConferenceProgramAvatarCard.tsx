import Image from 'next/image';
import React from 'react';

interface usersListType {
  _id: string;
  sponsor_name: string;
  sponsor_logo: string;
  sponsor_URL: string;
  createdAt: string;
}

const ConferenceProgramAvatarCard = ({
  usersList,
}: {
  usersList: usersListType[];
}) => {
  return (
    <div>
      {usersList?.length > 0 ? (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center">
            {usersList?.slice(0, 4).map((user) => (
              <figure
                key={user?._id}
                className="border-gray relative z-10 -ml-1.5 flex h-8 w-8 items-center justify-center rounded-full	border	"
              >
                {user?.sponsor_logo ? (
                  <Image
                    src={user?.sponsor_logo ?? ''}
                    alt="user avatar"
                    fill
                    className="rounded-full"
                  />
                ) : (
                  <img
                    src={'/static/images/user.svg'}
                    alt=""
                    style={{ width: 18, height: 18 }}
                  />
                )}
              </figure>
            ))}
          </div>
          {usersList?.length > 4 ? (
            <span>Total {usersList?.length} users</span>
          ) : (
            ''
          )}
        </div>
      ) : (
        '-'
      )}
    </div>
  );
};

export default ConferenceProgramAvatarCard;
