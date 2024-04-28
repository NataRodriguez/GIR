// pages/api/getReservations.js
import dynamoDb from '../../utils/awsConfig'; // Asegúrate de tener esta configuración adecuada.

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { date, professionalId } = req.query;

    if (!date || !professionalId) {
        return res.status(400).json({ message: 'Bad Request: Date and Professional ID are required.' });
    }

    const params = {
        TableName: 'Reservas',
        IndexName: 'profesionalId-fechaHora-index', // El nombre de tu GSI que tiene 'profesionalId' y 'fechaHora' como clave de partición y rango respectivamente
        KeyConditionExpression: 'profesionalId = :profId AND begins_with(fechaHora, :date)',
        ExpressionAttributeValues: {
            ':profId': professionalId,
            ':date': date
        }
    };

    try {
        const data = await dynamoDb.query(params).promise();
        res.status(200).json({ reservations: data.Items });
    } catch (error) {
        console.error('DynamoDB Error:', error);
        res.status(500).json({ message: 'Failed to fetch reservations', error: error.message });
    }
}
