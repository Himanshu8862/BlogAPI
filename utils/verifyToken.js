const jwt = require("jsonwebtoken")

const verifyToken = (token) =>{
    return jwt.verify(token, process.env.JWT_TOKEN, (err, decoded)=>{
        if(err){
            return false;
        }else{
            return decoded;
        };
    })
};

module.exports = verifyToken;