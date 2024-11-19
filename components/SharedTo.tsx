'use client';

import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getFilesByEmail } from '@/lib/actions/file.actions';
import Image from 'next/image';

// Define the File type
interface File {
  $id: string;
  [key: string]: any;
}

// Props for SharedTo
interface SharedToProps {
  usedBy: string;
}

const SharedTo: React.FC<SharedToProps> = ({ usedBy }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const fetchedFiles = await getFilesByEmail(usedBy);
        console.log(fetchedFiles)
        setFiles(fetchedFiles || []); // Safely set files or empty array
      } catch (error) {
        console.error('Failed to fetch files:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (usedBy) fetchFiles();
  }, [usedBy]);

  return (
            <div>
        {isLoading ? (
            <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="ml-2 animate-spin"
            />
        ) : files?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
                <Card key={file.$id} file={file} />
            ))}
            </div>
        ) : (
            <p>No files shared with this user.</p>
        )}
        </div>
  );
};

export default SharedTo;

