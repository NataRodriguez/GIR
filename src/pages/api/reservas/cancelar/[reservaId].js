import dynamoDb from '../../../../utils/awsConfig';

export default async function handler(req, res) {
  const { reservaId } = req.query;

  if (req.method === 'DELETE') {
    const deleteParams = {
      TableName: 'Reservas',
      Key: {
        'reservaId': reservaId
      },
      ConditionExpression: 'attribute_exists(reservaId)' // Asegurarse de que la reserva existe antes de intentar eliminarla
    };

    try {
      await dynamoDb.delete(deleteParams).promise();
      res.status(200).json({ message: 'Reserva cancelada correctamente' });
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      res.status(500).json({ message: 'Error al cancelar la reserva', error: error.toString() });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
