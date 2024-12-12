import React from 'react';
import styled, { keyframes } from 'styled-components'; 
const imagePath = require('../../src/img/oud_ombre.PNG');

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  margin: 26px;
  animation: ${fadeIn} 1s ease-in-out;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  padding: 26px;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  justify-self: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const SubHead = styled.h2`
  font-size: 25px;
  color: black;
  margin-bottom: 15px;
  border-bottom: 2px solid black;
  padding-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
`;

const Paragraph = styled.p`
 font-size: 16px;
  color: black;
  line-height: 1.8;
`;


const StyledImage = styled.img`
  --s: 35px;  /* size of the frame */
  --b: 2px;   /* border thickness */
  --w: 100%; /* width of the image */
  --c: #7B3B3B;

  width: 100%;
  max-width: 400px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  padding: calc(2*var(--s));
  --_g: var(--c) var(--b),#0000 0 calc(100% - var(--b)),var(--c) 0;
  background:
    linear-gradient(      var(--_g)) 50%/100% var(--_i,100%) no-repeat,
    linear-gradient(90deg,var(--_g)) 50%/var(--_i,100%) 100% no-repeat;
  outline: calc(var(--w)/2) solid #0009;
  outline-offset: calc(var(--w)/-2 - 2*var(--s));
  transition: .4s;
  cursor: pointer;
  justify-self: center;

  &:hover {
    outline: var(--b) solid var(--c);
    outline-offset: calc(var(--s)/-2);
    --_i: calc(100% - 2*var(--s));
    transform: scale(1.1);
  }
`;


const PopularProduct2 = () => {
    return (
        <div>
            <Container className='pt-3'>
                <StyledImage
                    src={imagePath}
                    alt="OUD OMBER IMAGE"
                    style={{
                        '--c': '#735a1f', // Override CSS variable for color
                        '--b': '1px',     // Override CSS variable for border thickness
                        '--s': '8px',    // Override CSS variable for size
                    }}
                />
                <TextContainer className='mt-2'>
                    <SubHead>Oud Ombre</SubHead>
                    <Paragraph>
                        Unleash the majesty of the East with Soha& Fatma's crowning glory - Oud Ombre!

                        This sublime blend of rich oud, velvety smooth sandalwood, and a hint of sweet vanilla has captured the hearts of perfume connoisseurs worldwide.

                        Oud Ombre is not just a fragrance, it's an experience. It's a journey through the souks of Arabia, where ancient traditions meet modern sophistication.

                        With its alluring scent and luxurious packaging, Oud Ombre is the perfect statement piece for any occasion.

                        Join the ranks of those who have fallen under its spell - try Oud Ombre today and discover why it's Soha& Fatma's best-selling master fragrance.
                    </Paragraph>
                </TextContainer>

            </Container>
        </div>
    );
};

export default PopularProduct2;
