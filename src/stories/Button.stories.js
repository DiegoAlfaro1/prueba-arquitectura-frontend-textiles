// Importa la función `action` de Storybook para mostrar clics en el panel de acciones
import { action } from '@storybook/addon-actions';

// Importa el componente Button que quieres documentar y mostrar en Storybook
import { Button } from '../components/Button';

// Exporta la configuración principal del Storybook para este componente
export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  // Define qué props pueden ser controladas desde la UI de Storybook
  argTypes: {
    backgroundColor: { control: 'color' },
    variant: {
      control: 'radio',
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    primary: { control: 'boolean' },
  },

  // Valores por defecto para todas las historias (como un template base)
  args: {
    onClick: action('clicked'),
  },
};

// Define historias específicas (variantes del botón) con diferentes props

export const Primary = {
  args: {
    primary: true,
    label: 'Primary Button',
    variant: 'contained',
  },
};

export const Secondary = {
  args: {
    primary: false,
    label: 'Secondary Button',
    variant: 'contained',
  },
};

export const Outlined = {
  args: {
    primary: true,
    label: 'Button',
    variant: 'outlined',
  },
};

export const Text = {
  args: {
    primary: true,
    label: 'Button',
    variant: 'text',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const CustomColor = {
  args: {
    label: 'Button',
    backgroundColor: '#FF5722',
    primary: true,
    variant: 'contained',
  },
};