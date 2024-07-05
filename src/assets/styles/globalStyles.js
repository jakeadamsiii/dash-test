import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    :root {
        --primary: #393956;
        --secondary: #E8EFE9;
        --inactive: #616178;
        --active: #737373;
        --border: #0B7373;
        --white: #fff; 

    }

    html, body {
        scroll-behavior: smooth;
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 16px;
    }

    body {
        font-size: 1rem;
        font-family: Outfit, ariel;
        font-weight: 400;
        overflow-x: hidden;
        color: var(--primary);
    }
    
    p {
        font-size: 1rem;
        line-height: 1.4;
        overflow-wrap: break-word;
        margin: 0;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 400;
    }

    h1 {
        font-size: 1.5rem;
    }

    h2, h3 {
        font-size: 1.25rem;
    }

    h4, h5, h6 {
        font-size: 1rem;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    button {
        border: none;
        outline: none;
        cursor: pointer;
    }

  `;



  export default GlobalStyles;