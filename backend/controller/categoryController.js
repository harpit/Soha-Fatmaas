import categoryModal from "../models/categoryModal.js";
import slugify from 'slugify'

export const createCategoryController = async (req,res)=>{
   try {
    const {name} = req.body;
    if (!name) {
        return res.status(401).send({message : "Name is Required"});
    }
    const existname = await categoryModal.findOne({name});
    if(existname){
        return res.status(200).send({status : true , message : "Name already exist"});
    }
    const category =await new categoryModal({name , slug : slugify(name)}).save();
    return res.status(200).send({status : true , message : "Category created successfully",category});
   } catch (error) {
    res.status(500).json({ status: false, message: error.message });
}
}

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
    
        if (!name) {
            return res.status(401).send({ message: "Name is Required" });
        }
        const existname = await categoryModal.findOne({ name });
        if (existname && existname._id.toString()!== id) {
            return res.status(200).send({ status: true, message: "Name already exist" });
        }
        const updatedCategory = await categoryModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        return res.status(200).send({ status: true, message: "Category updated successfully", updatedCategory });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const allCategoryController = async (req, res) => {
    try {
        const categories = await categoryModal.find({});
        return res.status(200).send({ status: true, message: "All Categories", categories });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.findOne({slug : req.params.slug});
        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }
        return res.status(200).send({ status: true, message: "Single Category", category });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).send({ message: "Category not found" });
        }
        return res.status(200).send({ status: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}