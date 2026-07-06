const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{

    const authHeader=req.headers.authorization;

    if(!authHeader){

        return res.status(401).json({

            message:"No Token"

        });

    }

    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : authHeader;

    if(!token){

        return res.status(401).json({

            message:"No Token"

        });

    }

    try{

        const decoded=jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.user=decoded;

        next();

    }

    catch(error){

        res.status(401).json({

            message:"Invalid Token"

        });

    }

};

module.exports=auth;