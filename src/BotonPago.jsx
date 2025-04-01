import { useState } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import Button from '@mui/material/Button';

function BotonPago() {
  const [preferenceId, setPreferenceId] = useState(null);

  const crearPreferencia = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/mercadoPago/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          products: [
            {
              title: 'Producto de prueba',
              quantity: 1,
              unit_price: 1000
            }
          ]
        })
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error en respuesta:", error);
        alert("Ocurrió un error al crear la preferencia");
        return;
      }

      const data = await res.json();
      console.log("Preferencia creada:", data);
      setPreferenceId(data.id);
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Error de conexión con el backend");
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={crearPreferencia}>
        Pagar con Mercado Pago
      </Button>
      {preferenceId && (
        <div style={{ marginTop: '20px' }}>
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
}

export default BotonPago;
