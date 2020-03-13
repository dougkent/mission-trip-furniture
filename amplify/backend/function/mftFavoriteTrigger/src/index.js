const AWS = require('aws-sdk');
const region = process.env.REGION;

AWS.config.update({ region: region });

const incrementExpression = 'set favoritedCount = favoritedCount + :f';
const decrementExpression = 'set favoriteCount = favoritedCount - :f';

exports.handler = async (event, context) => {
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));

    var docClient = new AWS.DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
    });

    event.Records.forEach(record => {
        const favoriteRecord = AWS.DynamoDB.Converter.unmarshall(
            record.dynamodb.NewImage
        );

        const params = {
            TableName: `${process.env.API_MISSIONTRIPFURNITURE_PLANTABLE_NAME}-${process.env.ENV}`,
            Key: {
                id: favoriteRecord.favoritePlanId,
            },
            UpdateExpression:
                record.eventName === 'INSERT'
                    ? incrementExpression
                    : decrementExpression,
            ExpressionAttributeValues: {
                ':f': 1,
            },
        };

        docClient.update(params, (err, data) => {
            if (err) {
                console.error(
                    'Unable to update plan favorited count. Error JSON: ',
                    JSON.stringify(err, null, 2)
                );
            } else {
                console.log(
                    'Update plan favorited count succeeded: ',
                    JSON.stringify(data, null, 2)
                );
            }
        });
    });

    context.done(null, 'Successfully processed DynamoDB record'); // SUCCESS with message
};
