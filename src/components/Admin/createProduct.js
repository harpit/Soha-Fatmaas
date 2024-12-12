import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../layout/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Select, InputNumber, Button as AntButton } from 'antd';

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

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [bottleSizes, setBottleSizes] = useState([{ size: "", price: "" }]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
      if (data?.status) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('photo', photo);
      formData.append('bottleSizes', JSON.stringify(bottleSizes)); // Append bottle sizes

      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/create-product`, formData);
      if (data?.status) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setShipping("");
        setPhoto("");
        setBottleSizes([{ size: "", price: "" }]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in creating product");
    }
  };

  const handleBottleSizeChange = (index, key, value) => {
    const newBottleSizes = [...bottleSizes];
    newBottleSizes[index][key] = value;
    setBottleSizes(newBottleSizes);
  };

  const handleAddBottleSize = () => {
    setBottleSizes([...bottleSizes, { size: "", price: "" }]);
  };

  const handleRemoveBottleSize = (index) => {
    const newBottleSizes = bottleSizes.filter((_, i) => i !== index);
    setBottleSizes(newBottleSizes);
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <ToastContainer />
      <Title>Add Product</Title>
      <Select
        size='large'
        showSearch
        placeholder="Select a Category"
        className='form-control'
        onChange={(value) => setCategory(value)}
      >
        {categories?.map((c) => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>
      <label className='btn btn-outline-dark col-md-12' style={{ marginTop: "20px" }}>
        {photo ? photo.name : "Upload Photo"}
        <input type='file' accept='/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
      </label>
      <div style={{ marginTop: "20px" }}>
        {photo && (
          <div className='text-center'>
            <img src={URL.createObjectURL(photo)} className='img img-responsive' alt='Product image' height={200} />
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
      <div style={{ marginTop: "20px" }}>
        <Select
          size='large'
          showSearch
          placeholder="Select Shipping"
          className='form-control'
          onChange={(value) => setShipping(value)}
        >
          <Option value="1">Yes</Option>
          <Option value="0">No</Option>
        </Select>
      </div>
      {bottleSizes.map((bottleSize, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <InputContainer>
            <InputWrapper>
              <Input
                type="text"
                value={bottleSize.size}
                onChange={(e) => handleBottleSizeChange(index, "size", e.target.value)}
                placeholder="Enter Bottle Size"
              />
            </InputWrapper>
          </InputContainer>
          <InputContainer>
            <InputWrapper>
              <Input
                type="number"
                value={bottleSize.price}
                onChange={(e) => handleBottleSizeChange(index, "price", e.target.value)}
                placeholder="Enter Bottle Price"
              />
            </InputWrapper>
          </InputContainer>
          <AntButton type="danger" onClick={() => handleRemoveBottleSize(index)}>
            Remove Size
          </AntButton>
        </div>
      ))}
      <AntButton type="dark" onClick={handleAddBottleSize}>
        Add Another Size
      </AntButton>
      <Button onClick={handleCreate}>
        Create Product
      </Button>
    </DashboardContainer>
  );
};

export default CreateProduct;
