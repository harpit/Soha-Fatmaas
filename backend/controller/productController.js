import fs from 'fs';
import productModal from '../models/productModal.js';
import categoryModal from '../models/categoryModal.js';
import slugify from 'slugify';

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping, bottleSizes } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).json({ status: false, message: 'Name is required' });
            case !description:
                return res.status(500).json({ status: false, message: 'Description is required' });
            case !price:
                return res.status(500).json({ status: false, message: 'Price is required' });
            case !quantity:
                return res.status(500).json({ status: false, message: 'Quantity is required' });
            case !category:
                return res.status(500).json({ status: false, message: 'Category is required' });
            case photo && photo.size > 1000000:
                return res.status(500).json({ status: false, message: 'Photo is required and should be less than 1MB' });
        }

        // Convert bottleSizes from JSON to an array of objects with size and price
        const bottleSizesArray = JSON.parse(bottleSizes).map(size => ({
            size: size.size,
            price: size.price
        }));

        const product = new productModal({
            ...req.fields,
            slug: slugify(name),
            bottleSizes: bottleSizesArray
        });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).json({ status: true, message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getProductsController = async (req, res) => {
    try {
        const products = await productModal.find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const singleProductController = async (req, res) => {
    try {
        const product = await productModal.findOne({ slug: req.params.slug }).select("-photo").populate("category")
            .populate("category")
            .select("-photo");
        if (!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }
        res.status(200).json({ status: true, product });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

//get photo

export const ProductPhotoController = async (req, res) => {
    try {
        const product = await productModal.findById(req.params.pid).select('photo');
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModal.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).json({ status: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, quantity, category, shipping, bottleSizes } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(400).json({ status: false, message: 'Name is required' });
            case !description:
                return res.status(400).json({ status: false, message: 'Description is required' });
            case !price:
                return res.status(400).json({ status: false, message: 'Price is required' });
            case !quantity:
                return res.status(400).json({ status: false, message: 'Quantity is required' });
            case !category:
                return res.status(400).json({ status: false, message: 'Category is required' });
            case photo && photo.size > 1000000:
                return res.status(400).json({ status: false, message: 'Photo should be less than 1MB' });
        }

        const updatedProduct = await productModal.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name), bottleSizes: JSON.parse(bottleSizes) },
            { new: true }
        );

        if (photo) {
            updatedProduct.photo.data = fs.readFileSync(photo.path);
            updatedProduct.photo.contentType = photo.type;
        }

        await updatedProduct.save();
        res.status(200).json({ status: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
// filter products
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await productModal.find(args);
        res.status(200).json({
            status: true,
            message: 'Filtered Products',
            products
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export const productCountController = async (req, res) => {
    try {
        const total = await productModal.find({}).estimatedDocumentCount();
        res.status(200).json({
            status: true,
            message: 'Product Count',
            total
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

//product list per page

export const productListController = async (req, res) => {
    try {
        const perPage = 12;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModal.find({})
            .select("-photo").skip((page - 1) * perPage)
            .limit(perPage).sort({ createdAt: -1 });
        res.status(200).json({
            status: true,
            products
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });

    }
}

export const productSearchController = async (req, res) => {
    try {
        const { keyword } = req.params;
        if (!keyword) {
            return res.status(400).json({ status: false, message: 'Keyword is required' });
        }

        const results = await productModal.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");

        res.status(200).json({
            status: true,
            message: 'Search Results',
            results
        });
    } catch (error) {
        console.error('Error in productSearchController:', error);
        res.status(500).json({ status: false, message: error.message });
    }
}

//related products
export const SimilarProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModal.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(6).populate("category");

        res.status(200).json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

//Category wise product

export const CategoryWiseProductController = async (req, res) => {
    try {
        const category = await categoryModal.findOne({ slug: req.params.slug });
        const products = await productModal.find({ category }).populate("category");
        res.status(200).json({ status: true, products, category });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}
