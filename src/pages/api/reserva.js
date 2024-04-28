import dynamoDb from '../../utils/awsConfig'; // Asegúrate de tener esta configuración.
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const RID = uuidv4();
        const { fechaHora, especialidad, estado, profesionalId, usuarioId } = req.body;
        const profesionalIdString = String(profesionalId);
        const RIDString = String(RID);

        const params = {
            TableName: 'Reservas',
            Item: {
                'reservaId': RIDString ,
                'fechaHora': fechaHora ,
                'especialidad': especialidad ,
                'estado':  estado ,
                'profesionalId':  profesionalIdString ,
                'usuarioId': usuarioId 
            }
        };
        try {
            await dynamoDb.put(params).promise();
            console.log(params);
            res.status(200).json({ success: true, message: 'Reserva guardada correctamente' });
        } catch (error) {
            console.error('DynamoDB Error:', error);
            res.status(500).json({ success: false, message: 'Error al guardar la reserva', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
