"use client"
import { UiLink } from "@/lib/components/ui-link";
import React, { useActionState } from "react";
import { ActionLogin } from "../lib/action-auth";
import { StateInitTypeAuth } from "@/lib/types/auth.type";

const StateInit: StateInitTypeAuth = {
  status: false,
  message: {
    email: "",
    password: "",
    messageDB: "",
  },
  inputs:{
    email:"",
    password:"",
    confirmPassword:""
  }
};

export default function Page() {
  const [, action, isPending] = useActionState(ActionLogin, StateInit);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <form action={action} className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden border border-gray-900 dark:border-white max-w-md w-full">
        <div className="px-6 py-8 md:px-8">
          {/* Título */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Ingresar
            </h2>
          </div>

          {/* Campos de Formulario */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                className="block w-full px-4 py-3 text-zinc-900 bg-white border rounded-lg dark:border-white dark:bg-zinc-800 dark:text-zinc-200 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full px-4 py-3 text-zinc-900 bg-white border rounded-lg dark:border-white dark:bg-zinc-800 dark:text-zinc-200 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all duration-200"
              />
            </div>

            {/* Botón de Inicio de Sesión */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-3 text-base font-medium text-white bg-gray-900 dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-gray-900 dark:focus:ring-white disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="ml-2">Cargando...</span>
                </div>
              ) : (
                "Ingresar"
              )}
            </button>
          </div>

          {/* Enlace a Recuperar Contraseña */}
          <div className="mt-4 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              ¿Olvidaste tu contraseña?
              <UiLink
                namePath="RecoverPassword"
                className="ml-1 font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-zinc-200 transition-colors duration-200"
                href="/recover-password"
              >
                Recuperar contraseña
              </UiLink>
            </p>
          </div>

          {/* Enlace a Registro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              ¿No tienes una cuenta?
              <UiLink
                namePath="Register"
                className="ml-1 font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-zinc-200 transition-colors duration-200"
                href="/register"
              >
                Regístrate
              </UiLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
