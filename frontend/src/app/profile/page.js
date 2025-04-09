// pages/profile.js
import VerifyAlert from "@/components/VerifyAlert";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
        <VerifyAlert />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Image
              src="/profile-pic.jpg" // Make sure to place a profile picture in the 'public' directory or use a URL.
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-blue-500"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">John Doe</h1>
            <p className="text-lg text-gray-600">Web Developer</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="mt-8 space-y-6">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-600">johndoe@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Location:</span>
            <span className="text-gray-600">San Francisco, CA</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Joined:</span>
            <span className="text-gray-600">January 2020</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Bio</h2>
          <p className="mt-4 text-gray-600">
            I'm a passionate web developer with experience in building dynamic
            web applications using JavaScript, React, and Next.js. I love creating
            beautiful and functional user interfaces and solving complex problems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
