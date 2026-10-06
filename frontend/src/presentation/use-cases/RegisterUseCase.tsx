"use client";

import React, { useState } from "react";
import { z } from "zod";
import {
  registerSchema,
  RegisterFormValues,
} from "../../core/application/validations/register.schema";
import { RegisterView } from "../views/RegisterView";
import { userService } from "../../core/application/services/user.service";

interface RegisterUseCaseProps {
  setShowRegister: (show: boolean) => void;
}

export function RegisterUseCase({ setShowRegister }: RegisterUseCaseProps) {
  const [formData, setFormData] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof RegisterFormValues, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar errores al escribir
    if (fieldErrors[e.target.name as keyof RegisterFormValues]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});

    try {
      if (!captchaCompleted) {
        setStatus("error");
        setErrorMessage("Por favor, completa el Captcha para continuar.");
        return;
      }

      setStatus("loading");

      // Llamada al servicio (validación Zod + Fetch)
      await UserService.registerUser(formData);

      setStatus("success");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setCaptchaCompleted(false);

      setTimeout(() => setShowRegister(false), 1500);
    } catch (error: any) {
      setStatus("error");
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof RegisterFormValues, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof RegisterFormValues] = err.message;
          }
        });
        setFieldErrors(errors);
        setErrorMessage("Por favor, revisa los campos en rojo.");
      } else {
        setErrorMessage(error.message || "Error desconocido");
      }
    }
  };

  return (
    <RegisterView
      formData={formData}
      captchaCompleted={captchaCompleted}
      status={status}
      errorMessage={errorMessage}
      fieldErrors={fieldErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      setCaptchaCompleted={setCaptchaCompleted}
      setShowRegister={setShowRegister}
    />
  );
}
