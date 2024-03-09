import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import avatar from "../../public/fox_6249911.png";

export type ProfileExpanderProps = {
  userData: {
    firstName: string;
    lastName: string;
    email: string;

    isLoggedIn: boolean;
  };
};

export const ProfileExpander: React.FC<ProfileExpanderProps> = ({
  userData,
}): JSX.Element => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
    // Perform logout actions
  };

  const handleLogin = () => {
    router.push("/profile");
  };

  return (
    <div className="absolute top-16 right-4 bg-white p-4 border rounded-md shadow-lg">
      {userData.isLoggedIn ? (
        <>
          <div>
            <Image
              src={avatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div>
            <p>{`${userData.firstName} ${userData.lastName}`}</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <div className="flex flex-col absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
          <button
            onClick={handleLogin}
            className="text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={handleLogin}
            className="text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
