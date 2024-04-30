import dynamoDb from '../../../../utils/awsConfig';

export default async function handler(req, res) {
  const { usuarioId } = req.query; // Recibe el usuarioId del parámetro de la URL
  
  if (req.method === 'GET') {
    const queryParams = {
      TableName: 'Reservas',
      IndexName: 'UsuarioIdFechaHoraIndex', // Asegúrate de que el índice está correctamente configurado en DynamoDB
      KeyConditionExpression: 'usuarioId = :usuarioId',
      ExpressionAttributeValues: {
        ':usuarioId': usuarioId
      },
      ScanIndexForward: false // Para ordenar los resultados por fechaHora de forma descendente
    };
    try {
      const { Items } = await dynamoDb.query(queryParams).promise();
      if (!Items || Items.length === 0) {
        return res.status(404).json({ message: 'No se encontraron reservas para este usuario' });
      }
      res.status(200).json({ reservas: Items });
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      res.status(500).json({ message: 'Error al obtener las reservas del usuario', error: error.toString() });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
