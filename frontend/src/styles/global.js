import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    :root {
        color-scheme: light;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    }

    body {
        min-height: 100vh;
        background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
        color: #0f172a;
    }

    #root {
        min-height: 100vh;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;

export default Global;