import multer from 'multer';
import ResponsePreset from '../helpers/responsePreset.helper.js';

const responsePreset = new ResponsePreset();

const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {

      cb(new Error('Not support type file.'), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }
});


const handleUpload = (fieldName) => {
  return (req, res, next) => {
    const upload = multerUpload.single(fieldName);

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {

        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json(responsePreset.resErr(
            400,
            'Maximum file size is 5 MB',
            'file_upload_error',
            { err }
          ));
        }

        return res.status(400).json(responsePreset.resErr(400, err.message, 'file_upload_error', { err }));
      } else if (err) {

        return res.status(400).json(responsePreset.resErr(400, err.message, 'file_type_error', { err }));
      }

      next();
    });
  };
};

export default handleUpload;