import dynamoDb from '../../../utils/awsConfig';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const params = {
      TableName: 'Profesionales'
    };
    try {
      const data = await dynamoDb.scan(params).promise();
      if (!data.Items) {
        return res.status(404).json({ message: 'No se encontraron Profesionales' });
      }
      res.status(200).json(data.Items);
    } catch (error) {
      console.error('Error al obtener profesionales:', error);
      res.status(500).json({ error: 'Error al obtener profesionales' });
    }
  } else if (req.method === 'PUT') {
    try{
      const { profesionalId, nombre, especialidad, telefono, email, direccion, comuna, region, servicios } = req.body;
      const params = {
        TableName: 'Profesionales',
        Key: {
          profesionalId: profesionalId
        },
        UpdateExpression: 'set nombre = :nombre, especialidad = :especialidad, telefono = :telefono, email = :email, direccion = :direccion, comuna = :comuna, region = :region, servicios = :servicios',
        ExpressionAttributeValues: {
          ':nombre': nombre,
          ':especialidad': especialidad,
          ':servicios': servicios,
          ':region': region,
          ':comuna': comuna,
          ':direccion': direccion,
        },
        ReturnValues: 'UPDATED_NEW'
      };
      const data = await dynamoDb.update(params).promise();
      res.status(200).json(data.Attributes);
    } catch (error) {
      console.error('Error al actualizar profesional:', error);
      res.status(500).json({ error: 'Error al actualizar profesional' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
