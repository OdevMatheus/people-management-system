const EMAIL_REGEX = /.+@.+\..+/;

const normalizeString = (value) => {
    if (typeof value !== "string") {
        return "";
    }

    return value.trim();
};

export const normalizeUserPayload = (payload = {}) => ({
    nome: normalizeString(payload.nome),
    email: normalizeString(payload.email),
    fone: normalizeString(payload.fone),
    data_nascimento: normalizeString(payload.data_nascimento),
});

const isValidDate = (value) => {
    if (!value) {
        return false;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return false;
    }

    return true;
};

const isFutureDate = (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date > today;
};

export const validateUserPayload = (payload) => {
    const errors = [];

    if (!payload.nome) {
        errors.push("Nome e obrigatorio.");
    }

    if (!payload.email) {
        errors.push("E-mail e obrigatorio.");
    } else if (!EMAIL_REGEX.test(payload.email)) {
        errors.push("E-mail invalido.");
    }

    if (!payload.fone) {
        errors.push("Telefone e obrigatorio.");
    }

    if (!payload.data_nascimento) {
        errors.push("Data de nascimento e obrigatoria.");
    } else if (!isValidDate(payload.data_nascimento)) {
        errors.push("Data de nascimento invalida.");
    } else if (isFutureDate(payload.data_nascimento)) {
        errors.push("Data de nascimento nao pode ser futura.");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

export const validateUserId = (value) => {
    if (value === undefined || value === null) {
        return null;
    }

    const id = Number(value);

    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }

    return id;
};

