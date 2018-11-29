import styled from "styled-components";

const OfferItemStyles = styled.li`
  box-shadow: ${props => props.theme.bs};
  list-style: none;
  padding: 2rem;
  border: 1px solid ${props => props.theme.offWhite};
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    position: relative;
  }
  .code {
    background: #ff0000;
    -webkit-transform: rotate(3deg);
    -ms-transform: rotate(3deg);
    transform: rotate(3deg);
    color: white;
    font-weight: 600;
    padding: 5px;
    line-height: 1;
    font-size: 3rem;
    display: inline-block;
    position: absolute;
    top: -3px;
    right: -3px;
  }
  .description {
    border-bottom: 2px solid #ccc;
    margin-top: 0;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    position: relative;
  }
  .date-container {
  }
  .date-badge {
    background: #f6f6f6;
    color: #797979;
    font-weight: 300;
    padding: 10px;
    line-height: 1;
    font-size: 1.5rem;
    display: inline-block;
    margin: 0 5px;
  }
`;

export default OfferItemStyles;
