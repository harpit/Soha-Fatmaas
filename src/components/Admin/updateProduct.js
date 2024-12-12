import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../layout/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Select ,Button as AntButton } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

const DashboardContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  color: #333;

  h1, h3 {
    margin-bottom: 15px;
  }

  h1 {
    font-size: 2.5em;
    color: #735a1f;
  }

  h3 {
    font-size: 1.2em;
    color: #9d8b54;
  }

  @media (max-width: 768px) {
    margin-left: 100px;
    padding: 20px;

    h1 {
      font-size: 2em;
    }

    h3 {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
    margin-left: 70px;
    padding: 20px;
    h1 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 0.9em;
    }
  }
`;

const Title = styled.h2`
  color: #735a1f;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Pacifico', cursive;
  font-size: 36px;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #735a1f;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #735a1f;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #9d8b54;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: #735a1f;
  }
`;

const CheckBoxGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");
  const [bottleSizes, setBottleSizes] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/single-product/${params.slug}`);
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setBottleSizes(data.product.bottleSizes || []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting product");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
      setCategories(data.categories);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('bottleSizes', JSON.stringify(bottleSizes));
      if (photo) formData.append('photo', photo);

      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/product/update-product/${id}`, formData);

      if (data?.success) {
        toast.error(data.message);  
      } else {
        toast.success(data.message); 
        setTimeout(() => {
            navigate(`/dashboard/admin/products`);
          }, 2000); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong while updating the product"); 
    }
  }

  const handleBottleSizeChange = (index, field, value) => {
    const updatedBottleSizes = [...bottleSizes];
    updatedBottleSizes[index] = { ...updatedBottleSizes[index], [field]: value };
    setBottleSizes(updatedBottleSizes);
  };

  const handleAddBottleSize = () => {
    setBottleSizes([...bottleSizes, { size: "", price: "" }]);
  };

  const handleRemoveBottleSize = (index) => {
    const updatedBottleSizes = bottleSizes.filter((_, i) => i !== index);
    setBottleSizes(updatedBottleSizes);
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <ToastContainer />
      <Title>Update Product</Title>
      <Select
        size="large"
        showSearch
        placeholder="Select a Category"
        className="form-control"
        onChange={(value) => setCategory(value)}
        value={category}
      >
        {categories?.map((c) => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>
      <label className="btn btn-outline-dark col-md-12" style={{ marginTop: "20px" }}>
        {photo ? photo.name : "Upload Photo"}
        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
      </label>
      <div style={{ marginTop: "20px" }}>
        {photo ? (
          <div className="text-center">
            <img src={URL.createObjectURL(photo)} className="img img-responsive" alt="Product" height={200} />
          </div>
        ) : (
          <div className="text-center">
            <img src={`${process.env.REACT_APP_API}/api/product/photo-product/${id}`} height={200} alt="Product Image" />
          </div>
        )}
      </div>
      <InputContainer>
        <InputWrapper>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
          />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputWrapper>
          <TextArea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product Description"
          />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputWrapper>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter Product Quantity"
          />
        </InputWrapper>
      </InputContainer>
      <InputContainer>
        <InputWrapper>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Product Price"
          />
        </InputWrapper>
      </InputContainer>
      <div style={{ marginBottom: "20px" }}>
        <Select
          variant={false}
          placeholder="Select Shipping"
          size="large"
          className="form-select mb-3"
          onChange={(value) => setShipping(value)}
          value={shipping ? "1" : "0"}
        >
          <Option value="1">Yes</Option>
          <Option value="0">No</Option>
        </Select>
      </div>
      <CheckBoxGroup>
        {bottleSizes.map((bottleSize, index) => (
          <div key={index}>
            <InputContainer>
              <InputWrapper>
                <Input
                  type="text"
                  value={bottleSize.size}
                  onChange={(e) => handleBottleSizeChange(index, "size", e.target.value)}
                  placeholder="Enter Bottle Size"
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="number"
                  value={bottleSize.price}
                  onChange={(e) => handleBottleSizeChange(index, "price", e.target.value)}
                  placeholder="Enter Bottle Price"
                />
              </InputWrapper>
              <AntButton type="danger" onClick={() => handleRemoveBottleSize(index)}>Remove Size</AntButton>
            </InputContainer>
          </div>
        ))}
        <AntButton type="dark" onClick={handleAddBottleSize}>Add Bottle Size</AntButton>
      </CheckBoxGroup>
      <Button onClick={handleUpdate}>Update Product</Button>
    </DashboardContainer>
  );
};

export default UpdateProduct;
