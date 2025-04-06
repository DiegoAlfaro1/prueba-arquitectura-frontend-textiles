// Importa React, necesario para definir componentes funcionales
import React from 'react';

// Importa PropTypes para validar las props que recibe el componente
import PropTypes from 'prop-types';

// Importa el componente Button de la librería Material UI
import MUIButton from '@mui/material/Button';

/** Botón personalizado usando Material UI */
export const Button = ({
  primary = false, // Si es true, usará el color 'primary'; si no, 'secondary'
  backgroundColor = null, // Permite definir un color de fondo personalizado
  size = 'medium', // Tamaño del botón: 'small', 'medium' o 'large'
  label, // Texto que aparecerá dentro del botón
  variant = 'contained', // Tipo de botón: 'contained', 'outlined', 'text'
  ...props // Cualquier otra prop adicional (por ejemplo: onClick)
}) => {
   // Determina si el botón usará el color 'primary' o 'secondary'
  const color = primary ? 'primary' : 'secondary';

  // Devuelve el botón de MUI con las props aplicadas
  return (
    <MUIButton
      variant={variant}
      color={color}
      size={size}
      sx={backgroundColor ? { backgroundColor } : {}}
      {...props}
    >
      {label}
    </MUIButton>
  );
};

// Definición de los tipos de props esperadas y sus validaciones
Button.propTypes = {
  /** ¿Es la acción principal en la página? */
  primary: PropTypes.bool,
  /** Color de fondo opcional */
  backgroundColor: PropTypes.string,
  /** Tamaño del botón */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Texto del botón */
  label: PropTypes.string.isRequired,
  /** Variante del botón */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  /** Manejador de clics */
  onClick: PropTypes.func,
};