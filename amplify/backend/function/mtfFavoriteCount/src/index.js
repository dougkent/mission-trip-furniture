/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiMissiontripfurniturePlanTableName = process.env.API_MISSIONTRIPFURNITURE_PLANTABLE_NAME
var apiMissiontripfurniturePlanTableArn = process.env.API_MISSIONTRIPFURNITURE_PLANTABLE_ARN
var apiMissiontripfurnitureGraphQLAPIIdOutput = process.env.API_MISSIONTRIPFURNITURE_GRAPHQLAPIIDOUTPUT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const region = process.env.REGION;

const incrementExpression = 'set #FC = #FC + :fc';
const decrementExpression = 'set #FC = #FC - :fc';

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
                    S: favoriteRecord.planId,
                },
            },
            UpdateExpression:
                record.eventName === 'INSERT'
                    ? incrementExpression
                    : decrementExpression,
            ExpressionAttributeNames: {
                '#FC': 'favoritedCount',
            },
            ExpressionAttributeValues: {
                ':fc': {
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
