# Reglas del Proyecto

## 🌍 Idioma
- Todo el código, comentarios, commits y PRs en **español**
- Variables y funciones en **inglés** (buena práctica universal)

---

## 📦 Al generar un Pull Request

### Título
- Formato: `tipo(scope): descripción corta`
- Máximo 72 caracteres
- Usar presente ("agrega" no "agregó")
- Incluir scope si es claro

**Tipos permitidos:**
| Tipo | Cuándo usarlo |
|------|--------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo documentación |
| `refactor` | Refactorización sin cambiar funcionalidad |
| `chore` | Tareas que no tocan código (configs, deps) |
| `ci` | Cambios en workflows o pipelines |
| `test` | Agregar o corregir tests |

### Descripción
Siempre incluir estas 3 secciones:
¿Qué cambió?
[resumen claro de los cambios]
¿Por qué?
[problema que resuelve o motivación]
¿Cómo probarlo?

1. Paso uno
2. Paso dos
3. Qué resultado esperar

---

## 💻 Al escribir código

- Agregar comentarios en funciones complejas
- No dejar `console.log` ni `var_dump` en el código final
- Manejar siempre los errores, no dejarlos silenciosos
- Funciones pequeñas, una sola responsabilidad

---

## 🗂️ Al generar commits

- Seguir el mismo formato que los títulos de PR
- Un commit = un cambio lógico
- No mezclar refactor con features en el mismo commit

---

## 🚫 Nunca hacer
- Subir credenciales, API keys o contraseñas
- Modificar archivos de lock (`package-lock.json`, `composer.lock`) manualmente
- Hacer push directo a `main` o `master`

## 🛠️ Stack del proyecto
- Detecta el stack leyendo `composer.json`, `package.json` 
  y `Dockerfile` si existen
- Úsalos como contexto al generar PRs y commits

**Ejemplos:**
feat(auth): agrega login con Google
fix(api): corrige error 500 en endpoint de usuarios
docs(readme): actualiza instrucciones de instalación

