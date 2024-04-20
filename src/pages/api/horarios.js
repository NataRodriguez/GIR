import dynamoDb from '../../utils/awsConfig';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { profesionalIds } = req.body; // Asegúrate de que estos IDs sean strings
        const promises = profesionalIds.map(profesionalId => {
            const params = {
                TableName: "HorariosProfesionales",
                IndexName: "ProfesionalIdIndex",
                KeyConditionExpression: "profesionalId = :profesionalId",
                ExpressionAttributeValues: {
                    ":profesionalId": String(profesionalId)  // Convertir a String si es necesario
                }
            };
            console.log(params);
            return dynamoDb.query(params).promise();
        });
        try {
            const results = await Promise.all(promises);
            console.log(results);
            const horarios = results.map(result => result.Items).flat();
            res.status(200).json({ horarios });
        } catch (error) {
            console.error("Error fetching schedules:", error);
            res.status(500).json({ error: "Error fetching schedules" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
