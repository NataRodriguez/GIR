import { useContext } from 'react';
import dynamoDb from '../../../utils/awsConfig';
import { useAuth } from '../../../context/AuthContext'; // Ajusta la ruta según la ubicación real de tu AuthContext

export default async function handler(req, res) {
  const { user } = useAuth(); // Obtener el usuario autenticado del contexto

  if (!user || (!user.ID && !user.profesionalId)) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  if (req.method === 'GET') {
    const { active } = req.query;
    const scanParams = {
      TableName: 'Reservas',
      FilterExpression: user.ID ? 'usuarioId = :id' : 'profesionalId = :id', 
      ExpressionAttributeValues: {
        ':id': user.ID || user.profesionalId,
      },
    };

    if (active === 'true' || active === 'false') {
      const estado = (active === 'true') ? 'Completada' : 'Activa';
      scanParams.FilterExpression += ' AND estado = :estado';
      scanParams.ExpressionAttributeValues[':estado'] = estado;
    }

    try {
      const { Items } = await dynamoDb.scan(scanParams).promise();
      if (!Items) {
        return res.status(404).json({ message: 'No se encontraron Reservas' });
      }
      res.status(200).json(Items);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la lista de reservas', error: error });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}