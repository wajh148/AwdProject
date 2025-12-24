const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name:"dj4i2rhd3",
    api_key:"947996868159272",
    api_secret:"ZmMOhANi4llMV5ijJEn-lZqfRNQ"
});

module.exports = cloudinary;