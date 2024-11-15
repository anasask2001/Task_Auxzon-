import { User } from "../../models/user_schema.js";


export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(404).json({status:"failed", mesage: "email not found" });
  }
  if (!password) {
    return res.status(404).json({status:"failed", mesage: "password not found" });
  }

  const alreadyexist = await User.findOne({email})
  if(alreadyexist){
    return res.status(409).json({ status: "failed", message: "Email already exists" });

  }

  const newuser = User({
    email: email,
    password: password,
  });
  await newuser.save();
  res.status(201).json({status:"success", message: "register successfull" });
};






export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ status: "failed", message: "Email not provided" });
    }

    if (!password) {
        return res.status(400).json({ status: "failed", message: "Password not provided" });
    }

 
        const user = await User.findOne({ email });
    
        
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const isPasswordCorrect = password===user.password
        if (!isPasswordCorrect) {
            return res.status(401).json({ status: "failed", message: "Incorrect password" });
        }

      
        if (user.role === "admin") {
          return res.status(200).json({ status: "success", message: "Admin login successful",user: user });
      }


        return res.status(200).json({ status: "success", message: "Login successful", user:user });

 
};
