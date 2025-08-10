import React from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const SidebarProfile = ({ profile, logo, setCurrentRoute }) => {
  const settings = profile; // your original code used settings and profile as the same

  return (
    <div className="items-center justify-between flex mt-5 mr-5">
      <div className="flex items-center justify-around gap-2">
        {profile && profile.avatar && (
          <img
            src={profile.avatar}
            alt="profile"
            className="h-8 w-8 rounded-full border-purple-500 object-cover cursor-pointer"
            onClick={() => setCurrentRoute(profile.title)}
          />
        )}
        {settings && (
          <MdOutlineAddCircleOutline
            className="text-2xl text-gray-300 hover:text-purple-600 cursor-pointer w-5 h-"
            onClick={() => setCurrentRoute(settings.title)}
          />
        )}
      </div>
      {/* Logo */}
      {logo && (
        <div className="flex items-center justify-around gap-2">
          {logo.icon && <logo.icon className="text-2xl text-purple-600" />}
          {logo.title && (
            <span className="text-lg font-semibold text-gray-700">
              {logo.title}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarProfile;
