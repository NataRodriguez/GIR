// pages/api/horarios.js
import dynamoDb from '../../utils/awsConfig';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { profesionalIds } = req.body; // Array de IDs de profesionales
        const keys = profesionalIds.map(id => ({ profesionalId: { S: id } }));

        const params = {
            RequestItems: {
                "HorariosProfesionales": {
                    Keys: keys,
                    ProjectionExpression: "horarioId, diaSemana, duracionCita, horaInicioDia, horaFinDia, profesionalId"
                }
            }
        };

        try {
            const data = await dynamoDb.batchGet(params).promise();
            res.status(200).json({ horarios: data.Responses.HorariosProfesionales });
        } catch (error) {
            console.error("Error fetching schedules:", error);
            res.status(500).json({ error: "Error fetching schedules" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
