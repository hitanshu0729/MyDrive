import { getFilesSharedBy } from '@/lib/actions/file.actions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Card from './Card';
// "strictNullChecks": false

interface SharedByProps {
    id: string; // Accepts the ID of the user or entity
  }
  interface File {
    $id: string;
    [key: string]: any;
  }
  
const SharedBy: React.FC<SharedByProps> = ({ id }) => {
    console.log(id);
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchFiles = async () => {
        setIsLoading(true);
        try {
          const fetchedFiles = await getFilesSharedBy(id);
          console.log(fetchedFiles)
           setFiles(fetchedFiles || []); // Safely set files or empty array
        } catch (error) {
          console.error('Failed to fetch files:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      if (id) fetchFiles();
    }, [id]);
  
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
}

export default SharedBy
