import dynamoDb from '../../../../utils/awsConfig';

export default async function handler(req, res) {
  const { profesionalId, active } = req.query;
  if (req.method === 'GET') {
    const scanParams = {
      TableName: 'Reservas',
      FilterExpression: 'profesionalId = :profesionalId', 
      ExpressionAttributeValues: {
        ':profesionalId': profesionalId,
      },
    };
    if (active){
      scanParams.FilterExpression += ' AND estado <> :estado';
      scanParams.ExpressionAttributeValues[':estado'] = 'Completada';
    }

    try {
      const { Items } = await dynamoDb.scan(scanParams).promise();
      if (!Items) {
        return res.status(404).json({ message: 'No se encontraron Reservas bajo este Profesional' });
      }
      res.status(200).json(Items);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la lista de reservas', error: error });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
