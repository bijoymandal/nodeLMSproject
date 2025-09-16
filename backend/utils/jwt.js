import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({
    user:{
        id:user.id,
        role:user.role
    },
  },
  process.env.JWT_SECRET,
  {
    expiresIn:'30d'
  });
};
