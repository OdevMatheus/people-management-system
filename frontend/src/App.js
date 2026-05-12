import GlobalStyle from "./styles/global.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form.js";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    `;

const Tittle = styled.h2``;

function App() {
    return (
        <>
            <Container>
                <Tittle>USUÁRIOS</Tittle>
                <Form />
            </Container>
            <ToastContainer autoClose={3000} position="bottom-left" />
            <GlobalStyle />
        </>
    );
}

export default App;
