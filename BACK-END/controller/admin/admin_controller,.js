import { User } from "../../models/user_schema.js";
import transport from "../../config/nodemiler.js";

export const getAdminUserCart = async (req, res) => {
    try {
        const users = await User.find().populate({
            path: "cart",
            model: "Product",
        });
        
        const usersWithCarts = users.filter(user => user.cart && user.cart.length > 0);

        if (!usersWithCarts.length) {
            return res
                .status(404)
                .json({ status: "failed", message: "No users with carts found" });
        }

        return res.status(200).json(usersWithCarts);
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};


export const confirmOrder = async (req, res) => {
      const {id}=req.params
      if(!id){
        return res.status(409).json({status:"failed",message:"Id not found"})
      }
      
      const user = await User.findById(id).populate('cart');
      if(!user){
        return res.status(404).json({status:"failed",message:"User not found"})
      }
      const {  email, cart } = user;

      const orderDetails = cart.map((item) => {
        return `<p>Product: ${item.name} | Price: ${item.discountedPrice}</p>`;
      }).join('');

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, 
        subject: 'Thanks for Your Order!',
        html: `
          <h1>Order Confirmation</h1>
          <p>Dear ${email},</p>
          <p>Thank you for your order. We have received it and are processing it.</p>
          <p>Your order details:</p>
          ${orderDetails}
          <p>If you have any questions, feel free to contact us at anasaskdev@gmail.com.</p>
          <p>Your order will be shipped soon.</p>
        `,
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending mail:", error);
          return res.status(500).json({ message: "Error sending mail", error });
        }
      });
      res.status(200).json({ message: 'Order confirmed, email sent!' });
};

