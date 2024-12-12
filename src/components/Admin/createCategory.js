import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../layout/img/logo.jpg';
import Sidebar from '../layout/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from './categoryForm';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'antd';

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

const SidebarContainer = styled.div`
  background-color: #000;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #fff;
  z-index: 1; /* Ensure Sidebar is below ContentContainer */

  @media (max-width: 768px) {
    height: auto;
    width: 100%;
    position: static;
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

const TableContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 1rem;

  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setupdateName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, { name });
      if (data?.status) {
        toast.success("Category added successfully");
        setName('');
        getAllCategory();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in adding category");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
      if (data.status) {
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

  //update category

  const handleupdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`,
        {
          name: updateName
        })
      if (data.status) {
        toast.success(`${updateName} updated successfully`);
        setSelected(null);
        setupdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  //delete category

  const handledelete = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/category/delete-category/${id}`)
      if (data.status) {
        toast.success(`Category delete successfully`);
        getAllCategory();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <DashboardContainer>
      <Sidebar />
      <ToastContainer />
      <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} isUpdate={false} />
      <Title>Manage Category</Title>
      <TableContainer>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <button className='btn btn-dark ms-2' onClick={() => {
                    setVisible(true);
                    setupdateName(c.name);
                    setSelected(c)
                  }}>Edit</button>
                  <button className='btn btn-danger ms-2' onClick={() => { handledelete(c._id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
      <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
        <CategoryForm value={updateName} setValue={setupdateName} handleSubmit={handleupdate} isUpdate={true} />
      </Modal>
    </DashboardContainer>
  );
};

export default CreateCategory;
