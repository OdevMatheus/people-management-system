import { db } from "../config/db.js";
import {
    normalizeUserPayload,
    validateUserPayload,
    validateUserId,
} from "../validators/user.js";

const handleDbError = (res, err) => {
    console.error("Database error:", err);
    return res.status(500).json({ message: "Erro ao acessar o banco de dados." });
};

export const getAllUser = (_, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err) {
            return handleDbError(res, err);
        }

        return res.status(200).json(data);
    });
};

export const createUser = (req, res) => {
    const payload = normalizeUserPayload(req.body);
    const { isValid, errors } = validateUserPayload(payload);

    if (!isValid) {
        return res.status(400).json({ message: errors[0], errors });
    }

    const q =
        "INSERT INTO usuarios (nome, email, fone, data_nascimento) VALUES (?, ?, ?, ?)";
    const values = [
        payload.nome,
        payload.email,
        payload.fone,
        payload.data_nascimento,
    ];

    db.query(q, values, (err, result) => {
        if (err) {
            return handleDbError(res, err);
        }

        return res.status(201).json({
            message: "Usuario cadastrado com sucesso.",
            data: { id: result.insertId },
        });
    });
};

export const updateUser = (req, res) => {
    const id = validateUserId(req.params.id);

    if (!id) {
        return res.status(400).json({ message: "Identificador invalido." });
    }

    const payload = normalizeUserPayload(req.body);
    const { isValid, errors } = validateUserPayload(payload);

    if (!isValid) {
        return res.status(400).json({ message: errors[0], errors });
    }

    const q =
        "UPDATE usuarios SET nome = ?, email = ?, fone = ?, data_nascimento = ? WHERE id = ?";
    const values = [
        payload.nome,
        payload.email,
        payload.fone,
        payload.data_nascimento,
        id,
    ];

    db.query(q, values, (err, result) => {
        if (err) {
            return handleDbError(res, err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario nao encontrado." });
        }

        return res.status(200).json({ message: "Usuario atualizado com sucesso." });
    });
};

export const deleteUser = (req, res) => {
    const id = validateUserId(req.params.id);

    if (!id) {
        return res.status(400).json({ message: "Identificador invalido." });
    }

    const q = "DELETE FROM usuarios WHERE id = ?";

    db.query(q, [id], (err, result) => {
        if (err) {
            return handleDbError(res, err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario nao encontrado." });
        }

        return res.status(200).json({ message: "Usuario removido com sucesso." });
    });
};
