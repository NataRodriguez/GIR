import dynamoDb from '../../../../utils/awsConfig';

export default async function handler(req, res) {
  const { usuarioId } = req.query;
  if (req.method === 'GET') {
    const queryParams = {
      TableName: 'Reservas',
      IndexName: 'UsuarioIdFechaHoraIndex', // Ensure your index is correctly set up in DynamoDB
      KeyConditionExpression: 'usuarioId = :usuarioId', // This is necessary for querying on a GSI
      ExpressionAttributeValues: {
        ':usuarioId': usuarioId,
        ':estado': 'Registrada'
      },
      FilterExpression: 'estado = :estado', // Correctly filtering by 'estado'
      ScanIndexForward: false // Sorting results by date and time in descending order
    };

    try {
      const { Items } = await dynamoDb.query(queryParams).promise();
      if (!Items || Items.length === 0) {
        return res.status(404).json({ message: 'No active reservations found for this user' });
      }
      res.status(200).json(Items);
    } catch (error) {
      console.error('Error retrieving reservations:', error);
      res.status(500).json({ message: 'Error obtaining reservation list', error: error.toString() });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
