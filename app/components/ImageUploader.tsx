"use client";

import { FileUploader } from '@aws-amplify/ui-react-storage';
import { useFilename } from './UploadContext';

export const ImageUploader = () => {
  const [filename, setFilename] = useFilename();

  return (
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="picture-submissions/"
      maxFileCount={1}
      isResumable
      onUploadSuccess={(data) => {
        console.log("Uploaded data to S3:", data);
        if (data.key) {
          setFilename(data.key);
        }
      }}
      onUploadError={(error) => {
        console.error("Error uploading data to S3:", error);
      }}
    />
  );
};