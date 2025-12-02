import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(image ? URL.createObjectURL(image) : null);

  // Update preview if parent image changes
  useEffect(() => {
    if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      <input 
        type="file" 
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <div 
            className="w-24 h-24 rounded-full bg-green-700 flex items-center justify-center text-white text-3xl"
            onClick={onChooseFile}
          >
            <LuUser />
          </div>
          <button 
            type="button" 
            onClick={onChooseFile} 
            className="flex items-center gap-1 text-green-600 font-medium hover:underline"
          >
            <LuUpload /> Upload
          </button>
        </div>
      ) : (
        <div className="relative w-24 h-24">
          <img 
            src={previewUrl} 
            alt="Profile Preview" 
            className="w-full h-full object-cover rounded-full border-2 border-green-400"
          />
          <button 
            type="button"
            onClick={handleRemoveImage}
            className="absolute bottom-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
