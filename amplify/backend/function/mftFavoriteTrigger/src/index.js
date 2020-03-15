const AWS = require('aws-sdk');
const region = process.env.REGION;

const incrementExpression =
    'set #favoritedCount = #favoritedCount + :favoritedCount';
const decrementExpression =
    'set #favoritedCount = #favoritedCount - :favoritedCount';

exports.handler = async (event, context) => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));

    AWS.config.update({ region: region });

    var ddb = new AWS.DynamoDB({
        apiVersion: '2012-08-10',
        region: region,
    });

    for (const index in event.Records) {
        const record = event.Records[index];

        let favoriteRecord;

        if (record.eventName === 'INSERT') {
            favoriteRecord = AWS.DynamoDB.Converter.unmarshall(
                record.dynamodb.NewImage
            );
        } else {
            favoriteRecord = AWS.DynamoDB.Converter.unmarshall(
                record.dynamodb.OldImage
            );
        }

        const params = {
            TableName: `${process.env.API_MISSIONTRIPFURNITURE_PLANTABLE_NAME}-${process.env.ENV}`,
            Key: {
                id: {
                    S: favoriteRecord.favoritePlanId,
                },
            },
            UpdateExpression:
                record.eventName === 'INSERT'
                    ? incrementExpression
                    : decrementExpression,
            ExpressionAttributeNames: {
                '#favoritedCount': 'favoritedCount',
            },
            ExpressionAttributeValues: {
                ':favoritedCount': {
                    N: '1',
                },
            },
        };

        try {
            await ddb.updateItem(params).promise();
        } catch (err) {
            console.log(err);
        }
    }

    context.done(null, 'Successfully processed DynamoDB record'); // SUCCESS with message
};
