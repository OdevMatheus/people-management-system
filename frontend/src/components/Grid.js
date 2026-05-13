import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import api, { getErrorMessage, getSuccessMessage } from "../api/client";

const Table = styled.table`
    width: 100%;
    background-color: #ffffff;
    padding: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    border-spacing: 0;
    word-break: break-word;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    padding: 12px 8px;
    font-size: 13px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    border-bottom: 1px solid #e2e8f0;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding: 14px 8px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
    color: #0f172a;
    border-bottom: 1px solid #f1f5f9;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const ActionButton = styled.button`
    border: none;
    background: #eef2ff;
    color: #4338ca;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 12px rgba(79, 70, 229, 0.2);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        box-shadow: none;
    }
`;

const EmptyState = styled.div`
    padding: 20px;
    text-align: center;
    color: #64748b;
    font-size: 14px;
`;

const Grid = ({ users, setUsers, setOnEdit, loading }) => {
    const [deletingId, setDeletingId] = useState(null);

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        if (deletingId) {
            return;
        }

        setDeletingId(id);

        try {
            const { data } = await api.delete(`/${id}`);
            const newArray = users.filter((user) => user.id !== id);

            setUsers(newArray);
            toast.success(getSuccessMessage(data, "Usuario removido com sucesso."));
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setDeletingId(null);
            setOnEdit(null);
        }
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Fone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {loading && (
                    <Tr>
                        <Td alignCenter colSpan={5}>
                            Carregando usuarios...
                        </Td>
                    </Tr>
                )}
                {!loading && users.length === 0 && (
                    <Tr>
                        <Td alignCenter colSpan={5}>
                            <EmptyState>Nenhum usuario cadastrado.</EmptyState>
                        </Td>
                    </Tr>
                )}
                {!loading &&
                    users.map((item, i) => (
                        <Tr key={item.id ?? item.email ?? i}>
                            <Td width="30%">{item.nome}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="20%" onlyWeb>
                                {item.fone}
                            </Td>
                            <Td alignCenter width="5%">
                                <ActionButton
                                    type="button"
                                    onClick={() => handleEdit(item)}
                                    aria-label={`Editar ${item.nome}`}
                                >
                                    <FaEdit />
                                </ActionButton>
                            </Td>
                            <Td alignCenter width="5%">
                                <ActionButton
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                    aria-label={`Excluir ${item.nome}`}
                                    disabled={deletingId === item.id}
                                >
                                    <FaTrash />
                                </ActionButton>
                            </Td>
                        </Tr>
                    ))}
            </Tbody>
        </Table>
    );
};

export default Grid;