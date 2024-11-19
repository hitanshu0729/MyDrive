'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getUserById } from '@/lib/actions/user.actions';
import { formatDateTime } from '@/lib/utils';
import { Separator } from "@/components/ui/separator"
import SharedTo from '@/components/SharedTo';
import SharedBy from '@/components/SharedBy';

// Define the User type
interface User {
  id:string;
  accountId: string;
  avatar: string;
  fullName: string;
  email: string;
  joinedDate: string;
  [key: string]: any; // To handle additional fields dynamically
}

const UserPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Access the dynamic 'id' parameter from the URL
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return; // Wait for the 'id' to be available
      const userId = Array.isArray(id) ? id[0] : id;
      console.log(id);
      try {
        // Replace with your API call to fetch user data based on the 'id'
        const response = await getUserById(userId);
        if(!response) return;
        console.log(response)
        setUser(response);
        console.log(user)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      finally{
        console.log(user)
      }
    };

    fetchUser();
  }, [id]); // Fetch user data when 'id' changes
  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    user ? <div className="w-full  sm:p-2 md:p-4 lg:p-8 bg-gray-50 flex flex-col h-auto min-h-full">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header Section */}
        <div className="flex items-center space-x-6">
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{user.fullName || 'No name'}</h1>
            <p className="text-gray-600">Joined: {formatDateTime(user.$createdAt) || 'Unknown'}</p>
          </div>
        </div>

      </div>
      <div className='pt-4 pb-4'><Separator/></div>
      <div className='w-full h-full'>
        <h1 className='text-2xl font-bold text-gray-800 pl-3 pr-3 text-center md:text-left lg:text-left pb-2'>Files shared to {user.fullName }</h1>
        {user.email && <SharedTo usedBy={user.email} />}
      </div>
      <div className='pt-4 pb-4'><Separator/></div>
      <div className='w-full h-full'>
        <h1 className='text-2xl font-bold text-gray-800 pl-3 pr-3 text-center md:text-left lg:text-left pb-2'>Files shared by {user.fullName }</h1>
        {user.$id && <SharedBy id={user.accountId} />}
      </div>
    </div> : <h1>No users</h1>
  );
};

export default UserPage;
