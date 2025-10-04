import cloudinary from '../config/cloudinary.config.js';

const UploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'cyberfeed_posts' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};


const deleteFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};


const getPublicIdFromUrl = (fileUrl) => {
  if (!fileUrl) return null;

  try {
    const parts = fileUrl.split('/');
    const versionIndex = parts.findIndex(part => part.startsWith('v'));
    const publicIdWithExtension = parts.slice(versionIndex + 1).join('/');
    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
    return publicId;
  } catch (error) {
    console.error('Gagal mengekstrak Public ID dari URL:', error);
    return null;
  }
};

export { UploadFromBuffer, deleteFromCloudinary, getPublicIdFromUrl };