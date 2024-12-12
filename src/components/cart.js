import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from './layout/layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  color: black;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
`;

const CartHeader = styled.h1`
  color: black;
  margin-bottom: 20px;
  font-size: 2.7em;
  font-weight: bolder;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const CartItems = styled.div`
  flex: 2;
  width: 100%;
  margin-right: 0;

  @media (min-width: 768px) {
    margin-right: 20px;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
`;

const ItemImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin-right: 15px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ItemName = styled.span`
  font-size: 1.5em;
  font-weight: bold;
`;

const ItemPrice = styled.span`
  font-size: 1.2em;
  margin-top: 5px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  padding: 5px 10px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;

  &:hover {
    background-color: #777;
  }
`;

const Quantity = styled.span`
  font-size: 1.2em;
`;

const PaymentDetails = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 20px;

  @media (min-width: 768px) {
    width: auto;
    margin-top: 0;
  }
`;

const PaymentHeader = styled.h2`
  color: black;
  font-weight: bold;
  font-size: 1.8em;
  margin-bottom: 5px;
`;

const PaymentInfo = styled.div`
  margin-bottom: 15px;
`;

const PaymentLabel = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  color: black;
`;

const PaymentValue = styled.div`
  font-size: 1.1em;
  color: black;
  margin-bottom: 10px;
`;

const CheckoutButton = styled.button`
  background-color: black;
  color: #fff;
  border: none;
  padding: 5px 0px;
  font-size: 1.0em;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;

  @media (min-width: 768px) {
    width: 45%;
  }
`;

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach(item => {
      const uniqueKey = `${item._id}_${item.size?._id}`;
      initialQuantities[uniqueKey] = parseInt(localStorage.getItem(`quantity_${uniqueKey}`)) || item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const handleQuantityChange = (productId, sizeId, change) => {
    const uniqueKey = `${productId}_${sizeId}`;
    setQuantities(prevQuantities => {
      const newQuantity = Math.max(0, prevQuantities[uniqueKey] + change);
      if (newQuantity === 0) {
        removeItemFromCart(productId, sizeId);
      } else {
        localStorage.setItem(`quantity_${uniqueKey}`, newQuantity);
        return { ...prevQuantities, [uniqueKey]: newQuantity };
      }
      return prevQuantities; // Return unchanged quantities if item is removed
    });
  };

  const removeItemFromCart = (productId, sizeId) => {
    const uniqueKey = `${productId}_${sizeId}`;
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => !(item._id === productId && item.size._id === sizeId));
      localStorage.removeItem(`quantity_${uniqueKey}`);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalAmount = cart.reduce((total, item) => {
    const uniqueKey = `${item._id}_${item.size?._id}`;
    const price = item.size?.price || item.price || 0;
    return total + price * quantities[uniqueKey];
  }, 0);

  return (
    <Layout>
      <CartContainer>
        <CartHeader>
          {cart.length > 0 ? `My Cart ${auth?.token ? "" : " - Please log in to proceed to checkout"}` : 'Your cart is currently empty'}
        </CartHeader>
        <ContentWrapper>
          <CartItems>
            {cart.map((product) => (
              <CartItem key={`${product._id}_${product.size?._id}`}>
                <ItemInfo>
                  <ItemImage
                    alt={product.name}
                    src={`${process.env.REACT_APP_API}/api/product/photo-product/${product._id}`}
                  />
                  <ItemDetails>
                    <ItemName>{product.name}</ItemName>
                    <ItemPrice>Price: ${product.size?.price || product.price || 0}</ItemPrice>
                  </ItemDetails>
                </ItemInfo>
                <QuantityControl>
                  <QuantityButton onClick={() => handleQuantityChange(product._id, product.size?._id, -1)}>-</QuantityButton>
                  <Quantity>{quantities[`${product._id}_${product.size?._id}`]}</Quantity>
                  <QuantityButton onClick={() => handleQuantityChange(product._id, product.size?._id, 1)}>+</QuantityButton>
                </QuantityControl>
              </CartItem>
            ))}
          </CartItems>
          <PaymentDetails>
            <PaymentHeader>Payment Details</PaymentHeader>
            <PaymentInfo>
              <PaymentLabel>Total Amount:</PaymentLabel>
              <PaymentValue>${totalAmount.toFixed(2)}</PaymentValue>
            </PaymentInfo>
            <CheckoutButton>Proceed to Checkout</CheckoutButton>
          </PaymentDetails>
        </ContentWrapper>
      </CartContainer>
    </Layout>
  );
};

export default CartPage;
