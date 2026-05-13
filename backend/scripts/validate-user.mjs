import {
    normalizeUserPayload,
    validateUserPayload,
    validateUserId,
} from "../src/validators/user.js";

const samples = [
    {
        description: "payload valido",
        payload: {
            nome: "Maria Santos",
            email: "maria@example.com",
            fone: "11999990000",
            data_nascimento: "1995-08-15",
        },
    },
    {
        description: "payload invalido",
        payload: {
            nome: "",
            email: "invalido",
            fone: "",
            data_nascimento: "3000-01-01",
        },
    },
];

const results = samples.map(({ description, payload }) => {
    const normalized = normalizeUserPayload(payload);
    const validation = validateUserPayload(normalized);

    return {
        description,
        normalized,
        validation,
    };
});

console.log("Validator check:");
console.log(JSON.stringify(results, null, 2));
console.log("validateUserId(10):", validateUserId(10));
console.log("validateUserId('abc'):", validateUserId("abc"));

