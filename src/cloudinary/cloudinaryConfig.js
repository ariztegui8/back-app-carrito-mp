import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dq2kjqcxd', 
  api_key: '467788185522571', 
  api_secret: 'oyOxUHB48rJsYJS-OLL_3l2oTzA' 
});
          
// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.CLOUD_KEY,
//     api_secret: process.env.CLOUD_SECRET
// });

export default cloudinary;
