import {
  registerSchema,
  RegisterFormValues,
} from "../validations/register.schema";

class UserService {
  static async registerUser(data: RegisterFormValues) {
    // 1. Zod Validation
    const validData = registerSchema.parse(data);

    // 2. Llamada a la API
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: validData.name,
        email: validData.email,
        password: validData.password,
        role: "cliente",
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Error al registrar el usuario. El correo podría estar en uso.",
      );
    }

    return response.json();
  }

  static async updateProfile(id: number, data: { dni?: string; ciudad?: string }, token: string) {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el perfil.");
    }

    return response.json();
  }
}

const userService = new UserService();
export default userService;
