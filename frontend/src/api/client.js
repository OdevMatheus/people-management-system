import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8800/users",
});

export const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data === "string") {
            return data;
        }

        if (data && typeof data.message === "string") {
            return data.message;
        }

        return error.message || "Erro inesperado.";
    }

    if (error && typeof error.message === "string") {
        return error.message;
    }

    return "Erro inesperado.";
};

export const getSuccessMessage = (data, fallback) => {
    if (typeof data === "string") {
        return data;
    }

    if (data && typeof data.message === "string") {
        return data.message;
    }

    return fallback;
};

export default api;

