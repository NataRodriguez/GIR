import dynamoDb from '../../../utils/awsConfig';

export default async function handler(req, res) {
  const { profesionalId } = req.query;
  if (req.method === 'GET') {
    const queryParams = {
      TableName: "Profesionales",
      KeyConditionExpression: "profesionalId = :profesionalId",
      ExpressionAttributeValues: {
        ":profesionalId": Number(profesionalId)
      }
    };
    try {
      const { Items } = await dynamoDb.query(queryParams).promise();
      if (!Items) {
        return res.status(404).json({ message: 'Profesional no encontrado' });
      }
      res.status(200).json(Items[0]);
    } catch (error) {
      console.error('Error al obtener los detalles del profesional:', error);
      res.status(500).json({ message: 'Error al obtener los detalles del profesional' });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        nombre,
        apellido,
        especialidad,
        region,
        comuna,
        servicios,
        valor,
      } = req.body;
      // Verificar si el usuario existe
      const getParams = {
        TableName: "Profesionales",
        KeyConditionExpression: "profesionalId = :profesionalId",
        ExpressionAttributeValues: {
          ":profesionalId": Number(profesionalId)
        }
      };
      const { Items } = await dynamoDb.query(getParams).promise();
      if (!Items) {
        return res.status(404).json({ error: 'Profesional no encontrado' });
      }
      // Actualizar los datos del profesional
      const updateParams = {
        TableName: "Profesionales",
        KeyConditionExpression: "profesionalId = :profesionalId",
        UpdateExpression: 'set nombre = :nombre, apellido = :apellido, especialidad = :especialidad, region = :region, comuna = :comuna, servicios = :servicios, valor = :valor',
        ExpressionAttributeValues: {
          ':nombre': nombre || Items[0].nombre,
          ':apellido': apellido || Items[0].apellido,
          ':especialidad': especialidad || Items[0].especialidad,
          ':region': region || Items[0].region,
          ':comuna': comuna || Items[0].comuna,
          ':servicios': servicios || Items[0].servicios,
          ':valor': valor || Items[0].valor,
          ':profesionalId': Number(profesionalId),
        },
        ReturnValues: 'UPDATED_NEW',
      };
      await dynamoDb.update(updateParams).promise();
      res.status(200).json({ message: 'Datos de Profesional actualizados correctamente' });
    } catch (error) {
      console.error('Error al actualizar los datos del Profesional:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
