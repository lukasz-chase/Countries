import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
      font-family: "Poppins", sans-serif;
}
.btn{
    font-family: "Poppins", sans-serif;
    background-color: #2db1e4;
    color: white;
    border-radius: 5rem;
    border: none;
    outline: none;
    padding: 0.5rem;
    cursor: pointer;
    margin: 0.5rem 0;
}
`;

export default GlobalStyles;
