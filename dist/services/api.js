"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogin = apiLogin;
const API_URL = "";
async function apiLogin(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }
        return data.data;
    }
    catch (error) {
        console.error("ERROR LOGIN:", error);
        throw new Error(error instanceof Error ? error.message : "No se pudo conectar al backend");
    }
}
//# sourceMappingURL=api.js.map