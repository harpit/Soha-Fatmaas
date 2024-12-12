import contactModal from '../models/contactModal.js';

export const contactController = async (req,res)=>{
    try {
        const {name,email,message} = req.body;
        if(!name ||!email ||!message){
            return res.status(400).json({message : "All fields are required"});
        }
        const contact = await new contactModal({name,email,message}).save();
        res.status(201).json({message : "Message sent successfully", contact});
        
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const getContactController = async (req,res)=>{
    try {
       const contact = await contactModal.find({});
       res.status(201).json({message : "data get successfully", contact});
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}