


const passwordExtractor=async(req,res,next)=>{
    const password = req.body.password 
console.log(password);
    // req.password = password;

    // console.log(req);

    next();
}

module.exports = passwordExtractor;