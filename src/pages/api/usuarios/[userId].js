import dynamoDb from '../../../utils/awsConfig';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    const params = {
      TableName: 'Usuarios',
      Key: {
        usuarioId: userId,
      },
    };

    try {
      const { Item } = await dynamoDb.get(params).promise();

      if (!Item) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json(Item);
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
      res.status(500).json({ message: 'Error al obtener los detalles del usuario' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { nombre, direccion, telefono } = req.body;

      // Verificar si el usuario existe
      const paramsGet = {
        TableName: 'Usuarios',
        Key: {
          usuarioId: userId,
        },
      };

      const { Item } = await dynamoDb.get(paramsGet).promise();

      if (!Item) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualizar los datos del usuario
      const paramsUpdate = {
        TableName: 'Usuarios',
        Key: {
          usuarioId: userId,
        },
        UpdateExpression: 'set nombre = :nombre, direccion = :direccion, telefono = :telefono',
        ExpressionAttributeValues: {
          ':nombre': nombre || Item.nombre,
          ':direccion': direccion || Item.direccion,
          ':telefono': telefono || Item.telefono,
        },
        ReturnValues: 'UPDATED_NEW',
      };

      await dynamoDb.update(paramsUpdate).promise();

      res.status(200).json({ message: 'Datos de usuario actualizados correctamente' });
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
