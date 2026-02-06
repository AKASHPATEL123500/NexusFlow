


export const allowRoles = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return res.status(403).json(
                {
                    success : false,
                    message : "Access denied role not allowed"
                }
            )
        }
        next()
    }
}