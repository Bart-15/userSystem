import styled from 'styled-components';


const Image = styled.img`
    height:200px;
    width:200px;
    border-radius:100%; 
`

const ImageContainer =  styled.div` 
     position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
`

const Overlay = styled.div`
    border-radius:100%; 
    position: absolute;
    height: 200px;
    width: 200px;
    opacity: 0;
    transition: .2s ease;
    background: rgba(0, 0, 0, 0.2);
   &:hover {
       opacity:.9;
   }
`
const Text = styled.p`
    color: white;
  font-size: 40px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export {
    Image,
    ImageContainer,
    Overlay,
    Text
}