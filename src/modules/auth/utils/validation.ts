// Constantes de validación para formularios de autenticación

// Expresiones regulares
export const REGEX = {
  // Validación básica de email (RFC 5322)
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  
  // Validación de contraseña: al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
};

// Longitudes mínimas
export const MIN_LENGTH = {
  NAME: 2,
  LAST_NAME: 2,
  PASSWORD: 8
};

// Funciones de validación comunes
export const validatePasswordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
}; 