<div align="center">
  <h1>⏱️ Time Tracker</h1>
  <p>Aplicación para registrar y consultar horas trabajadas con Supabase + Next.js App Router.</p>
</div>

## Tabla de contenido

1. [Resumen](#resumen)
2. [Stack principal](#stack-principal)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Requerimientos previos](#requerimientos-previos)
5. [Configuración de entorno](#configuración-de-entorno)
6. [Scripts disponibles](#scripts-disponibles)
7. [Integración con Supabase](#integración-con-supabase)
8. [Flujos funcionales](#flujos-funcionales)
9. [Arquitectura y decisiones clave](#arquitectura-y-decisiones-clave)
10. [Calidad, pruebas y lint](#calidad-pruebas-y-lint)
11. [Despliegue](#despliegue)
12. [Resolución de problemas](#resolución-de-problemas)

## Resumen

Time Tracker es una aplicación full-stack construida con Next.js 15 (App Router) y Supabase para manejar autenticación, persistencia y recuperación de contraseñas. Los usuarios pueden:

- Iniciar sesión / registrarse.
- Registrar el inicio y fin de su jornada; la app calcula automáticamente los minutos transcurridos y los persiste.
- Consultar un historial tabular por mes/año.
- Recuperar o restablecer su contraseña mediante flujos guiados y códigos OTP.

La UI se basa en componentes reutilizables (Radix UI + shadcn-inspired) y estilos propios (`src/app/(pages)/home.module.css`).

## Stack principal

| Capa       | Tecnología                                               | Descripción                                                      |
| ---------- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| Frontend   | Next.js 15, React 19                                     | App Router, Server + Client Components, Turbopack en desarrollo. |
| Backend    | Supabase (PostgreSQL + Auth)                             | `@supabase/ssr` para clientes server/client y autenticación.     |
| Estilos/UI | CSS Modules, Radix UI, `lucide-react`, `input-otp`       | Formularios y componentes accesibles.                            |
| Utilidades | `date-fns`, `class-variance-authority`, `tailwind-merge` | Formateo de tiempo, composición de clases.                       |

## Estructura del proyecto

```
├── src
│   ├── app
│   │   ├── (auth)            # páginas de login, recover-password, reset-password
│   │   ├── (pages)           # layout principal y home protegida
│   │   ├── globals.css       # estilos globales
│   │   └── layout.tsx        # layout raíz (App Router)
│   ├── components
│   │   ├── uibtn-register-time/  # botón para registrar tiempos
│   │   └── ui/                   # Input, Label, InputOTP, Button, Table, etc.
│   ├── lib
│   │   ├── actions/          # Server Actions (auth, cookies, tabla de registros)
│   │   ├── helpers/          # utilidades de formato de tiempo
│   │   ├── hooks/            # hooks compartidos (ej. localStorage)
│   │   ├── supabase/         # clientes server/client
│   │   └── types/            # tipos derivados de Supabase y formularios
│   └── repository            # capa de acceso a datos (TimeRepository)
├── supabase
│   ├── config.toml           # configuración local de Supabase
│   └── migrations/           # migraciones SQL (ej. columna favorite)
├── README.md
└── package.json
```

## Requerimientos previos

- Node.js ≥ 18.18 (recomendado 20+).
- npm ≥ 9 (o pnpm/yarn si lo prefieres).
- Cuenta en [Supabase](https://supabase.com) y proyecto creado.
- Acceso al CLI de Supabase (opcional pero recomendado) `npm install -g supabase`.

## Configuración de entorno

1. **Clonar e instalar dependencias**

   ```bash
   git clone https://github.com/camiloguz23/time.git
   cd time
   npm install
   ```

2. **Variables de entorno**
   Crea un archivo `.env` (usa `.env.production` como referencia si aplica) con:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<https://your-project.supabase.co>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<public-anon-key>
   ```

   - **URL** y **anon key** se obtienen en la sección _Project Settings → API_ de Supabase.
   - No se comparten públicamente tus claves privadas (service role).

3. **Servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000). El App Router recargará cambios de forma automática.

## Scripts disponibles

| Script          | Descripción                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `npm run dev`   | Inicia Next.js en modo desarrollo con Turbopack.                             |
| `npm run build` | Genera la build de producción.                                               |
| `npm run start` | Ejecuta la build generada.                                                   |
| `npm run lint`  | Corre ESLint (`next lint`). Mantén este comando en verde antes de hacer PRs. |

## Integración con Supabase

1. **Provisionar proyecto** en Supabase y habilitar la autenticación por correo.
2. **Configurar la URL y anon key** en `.env` (ver sección anterior).
3. **Migraciones**
   - Las migraciones SQL viven en `supabase/migrations/`.
   - Para aplicarlas localmente con el CLI:
     ```bash
     supabase login
     supabase link --project-ref <tu-project-ref>
     supabase db push
     ```
   - El archivo `20250617214210_new_fields.sql` añade la columna `favorite` a la tabla `register`.
4. **Clientes Supabase**
   - `SupabaseClient` (browser) usa `@supabase/ssr` y las llaves públicas para interacciones desde Client Components.
   - `SupabaseServer` (server) funciona con cookies firmadas para preservar sesiones en Server Components y Server Actions.

## Flujos funcionales

### Autenticación + recuperación

- **Registro / Login**: manejados mediante server actions en `src/app/(auth)/lib/action-auth.ts` y servicios en `lib/services/auth-services.ts`.
- **Recuperación de contraseña**: `/auth/recover-password` solicita correo y dispara `ActionRecoverPassword` → Supabase envía email con enlace/OTP.
- **Reset**: `/auth/reset-password` consume el código (`searchParams` o cookie) y usa `SupabaseClient().auth.verifyOtp` + `updateUser` para definir la nueva contraseña.
- **Cookies helper**: `src/lib/actions/cookies.action.ts` setea/lee cookies server-side para compartir el código entre rutas.

### Registro de horas

- **Botón principal**: `UiBtnRegisterTime` almacena en localStorage la marca inicial y, al detenerse, calcula minutos con `date-fns` (`differenceInMinutes`).
- **Server Action `actionTime`**: persiste el registro mediante `TimeRepository.addTime` y fuerza `revalidatePath("/")` para refrescar la tabla.
- **Tabla histórica**: la página `/` usa `tableRegisterAction` (Server Action) para traer los datos y mostrarlos en un `<Table>` responsive; las utilidades de `TimeHelperFormat` convierten minutos → hh:mm y mes → nombre.

## Arquitectura y decisiones clave

- **App Router**: `src/app/(pages)` alberga el layout principal protegido; el router utiliza `use(SupabaseServer())` y `use(tableRegisterAction())` para hidratar datos en server-side.
- **Server Actions**: centralizan lógica mutante (registro de horas, auth, cookies) evitando API Routes manuales.
- **Cliente único de Supabase**: la misma URL/anon-key se reutiliza en server/client para facilitar SSR + CSR sin duplicar configuración.
- **Componentes UI reutilizables**: `src/components/ui/` incluye Input, Label e InputOTP (basados en Radix + shadcn styles) para mantener consistencia visual y accesibilidad.
- **Formato de tiempo**: `lib/helpers/time.helper.ts` transforma minutos a horas legibles y nombres de meses.
- **Supabase migrations**: replican el estado del esquema en código fuente, permitiendo reproducir entornos.

## Calidad, pruebas y lint

- `npm run lint` debe ejecutarse y quedar en verde antes de abrir PRs. La base actual ya corrige dependencias de hooks e imports innecesarios.
- Se recomienda agregar pruebas e2e (Playwright) y/o unitarias (Vitest/RTL) en el futuro; actualmente no existen suites automatizadas.
- Revisa `src/components/uibtn-register-time/ui-btn-register-time.tsx` si agregas efectos secundarios: los hooks tienen dependencias definidas para evitar advertencias de ESLint (`react-hooks/exhaustive-deps`).

## Despliegue

1. **Vercel** (recomendado):
   - Importa el repositorio.
   - Configura las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en la sección _Environment Variables_.
   - Ejecuta el workflow default (Next.js build + start).
2. **Self-hosted**:
   - Corre `npm run build` y `npm run start` detrás de tu reverse proxy favorito.
   - Asegúrate de exportar las mismas variables de entorno.

## Resolución de problemas

| Problema                               | Posible causa / solución                                                                                        |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **No recibo correos de recuperación**  | Verifica en Supabase → Auth → Providers que el correo esté habilitado y revisa la bandeja de spam.              |
| **404/Redirect loop tras login**       | Confirma que las cookies del dominio estén habilitadas; `SupabaseServer` depende de ellas para mantener sesión. |
| **`NEXT_PUBLIC_SUPABASE_*` undefined** | revisa `.env` y reinicia `npm run dev` al cambiar variables.                                                    |
| **Migración `favorite` falla**         | Comprueba que la tabla `register` exista y que estás linkeado (`supabase link`).                                |

---

¿Dudas o sugerencias? Abre un issue o PR. ¡Happy coding! ✨
