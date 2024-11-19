import { getAllUsersExceptCurrent, getCurrentUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Define the User interface with required properties
interface User {
  accountId: string;
  avatar: string;
  fullName: string;
  createdAt: string; // Store the formatted date
}

const FilterUsers = () => {
  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const users = await getAllUsersExceptCurrent(currentUser.accountId);
          console.log(users);
          
          // Check if users is defined and is an array
          if (users && Array.isArray(users)) {
            // Map the users data to the User type
            const formattedUsers: User[] = users.map((user: any) => ({
              accountId: user.accountId, // Assuming 'accountId' exists
              avatar: user.avatar || '',  // Handle missing avatar if needed
              fullName: user.fullName || '', // Handle missing fullName if needed
              createdAt: new Date(user.$createdAt).toLocaleDateString() || 'No date', // Format the date
            }));
            setOtherUsers(formattedUsers); // Set formatted users
          } else {
            console.error('No users found or users is not an array.');
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col flex-wrap">
        <h1 className="w-full flex justify-center items-center text-2xl font-semibold text-gray-800 bg-gray-100 p-4 rounded ">
          Click on any user to see interaction with them
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {otherUsers.map((user) => (
      <Link href={`/users/${user.accountId}`}
        key={user.accountId}
        className="sidebar-user-info flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md"
      >
        <Image
          src={user.avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar rounded-full"
        />
        <div>
          <p className="subtitle-2 capitalize text-gray-700">{user.fullName || 'No name'}</p>
          <p className="caption text-gray-500 font-semibold">
            Joined: <span>{user.createdAt || 'No date'}</span>
          </p>
        </div>
      </Link>
    ))}
  </div>
    </div>
  );
};

export default FilterUsers;
