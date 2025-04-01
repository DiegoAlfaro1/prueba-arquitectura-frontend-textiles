import { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

initMercadoPago('APP_USR-b40b458e-aeb6-426b-8761-6d723fbd156d'); 

const Checkout = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:5000/api/mercadoPago/create_preference', {
      products: [
        {
          title: 'Producto de prueba',
          quantity: 1,
          unit_price: 1000,
        },
      ],
    })
    .then(res => {
      setPreferenceId(res.data.id);
    })
    .catch(err => {
      console.error('Error al crear preferencia:', err);
    });
  }, []);

  return (
    <div>
      <h2>Realizar pago</h2>
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}
    </div>
  );
};

export default Checkout;
