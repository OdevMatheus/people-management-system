import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api, { getErrorMessage, getSuccessMessage } from "../api/client";

const FormContainer = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    background-color: #f8fafc;
    padding: 20px;
    border-radius: 18px;
    border: 1px solid #e2e8f0;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Input = styled.input`
    width: 100%;
    padding: 0 12px;
    border: 1px solid #cbd5f5;
    border-radius: 10px;
    height: 42px;
    font-size: 14px;
    color: #0f172a;
    background: #ffffff;

    &:focus {
        outline: 2px solid #c7d2fe;
        border-color: #818cf8;
    }
`;

const Label = styled.label`
    font-size: 13px;
    color: #475569;
    font-weight: 600;
`;

const Button = styled.button`
    padding: 12px 16px;
    cursor: pointer;
    border-radius: 12px;
    border: none;
    background-color: #4f46e5;
    color: white;
    height: 44px;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(79, 70, 229, 0.25);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        box-shadow: none;
    }
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();
    const [isSaving, setIsSaving] = useState(false);
    const maxBirthDate = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome || "";
            user.email.value = onEdit.email || "";
            user.fone.value = onEdit.fone || "";
            user.data_nascimento.value = onEdit.data_nascimento || "";
        }
    }, [onEdit]);

    const resetForm = () => {
        const user = ref.current;

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";
    };

    const isEmailValid = (value) => /.+@.+\..+/.test(value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;
        const nome = user.nome.value.trim();
        const email = user.email.value.trim();
        const fone = user.fone.value.trim();
        const dataNascimento = user.data_nascimento.value;

        if (!nome || !email || !fone || !dataNascimento) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        if (!isEmailValid(email)) {
            toast.warn("Informe um e-mail valido.");
            return;
        }

        if (dataNascimento > maxBirthDate) {
            toast.warn("A data de nascimento nao pode ser futura.");
            return;
        }

        setIsSaving(true);

        try {
            const payload = {
                nome,
                email,
                fone,
                data_nascimento: dataNascimento,
            };

            if (onEdit) {
                const { data } = await api.put(`/${onEdit.id}`, payload);
                toast.success(getSuccessMessage(data, "Usuario atualizado com sucesso."));
            } else {
                const { data } = await api.post("/", payload);
                toast.success(getSuccessMessage(data, "Usuario cadastrado com sucesso."));
            }

            resetForm();
            setOnEdit(null);
            getUsers();
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome completo</Label>
                <Input name="nome" placeholder="Ex: Maria Santos" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email" placeholder="maria@email.com" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" placeholder="(11) 99999-0000" />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" max={maxBirthDate} />
            </InputArea>

            <Button type="submit" disabled={isSaving}>
                {isSaving ? "SALVANDO..." : onEdit ? "ATUALIZAR" : "SALVAR"}
            </Button>
        </FormContainer>
    );
};

export default Form;