"use client";
import { StateInitTypeAuth } from "@/lib/types/auth.type";
import React, { useActionState } from "react";
import { ActionRegister } from "../lib/action-auth";
import { UiLink } from "@/lib/components/ui-link";

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
  const [state, action, isPending] = useActionState(ActionRegister, StateInit);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900">
      <form action={action} className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden border border-gray-900 dark:border-white max-w-md w-full">
        <div className="px-6 py-8 md:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Registro
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="you@example.com"
                defaultValue={state.inputs.email}
                
                className="block w-full px-4 py-3 text-zinc-900 bg-white border rounded-lg dark:border-white dark:bg-zinc-800 dark:text-zinc-200 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all duration-200"
              />
              {state.message.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {state.message.email}
                </p>
              )}
            </div>
            <div className="mt-6">
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
                defaultValue={state.inputs.password}
                className="block w-full px-4 py-3 text-zinc-900 bg-white border rounded-lg dark:border-white dark:bg-zinc-800 dark:text-zinc-200 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all duration-200"
              />
              {state.message.password && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {state.message.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-300"
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                defaultValue={state.inputs.confirmPassword}
                className="block w-full px-4 py-3 text-zinc-900 bg-white border rounded-lg dark:border-white dark:bg-zinc-800 dark:text-zinc-200 focus:border-gray-900 dark:focus:border-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all duration-200"
              />
              {state.message.messageDB && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                  {state.message.messageDB}
                </p>
              )}
            </div>
            </div>
            <div>
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
                  "Registrarse"
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              ¿Ya tienes una cuenta?
              <UiLink
                namePath="Login"
                className="ml-1 font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-zinc-200 transition-colors duration-200"
                href="/login"
              >
                Inicia sesión
              </UiLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
