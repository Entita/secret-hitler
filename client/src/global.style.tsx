import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* @font-face {
        font-family: 'Rockwell';
        src        : url('font/ROCC.ttf');
        font-weight: normal;
        font-style : normal;
    } */

    * {
        margin     : 0;
        padding    : 0;
        box-sizing : border-box;
        user-select: none;
    }
    button {
        cursor: pointer;
        outline: none;
    }
    input {
        outline: none;
    }
    .react-draggable {
        cursor: move;
    }
    .tooltip {
        width: max-content;
    }
`;
