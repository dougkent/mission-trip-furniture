# Mission Trip Furniture

This repository is the source code for missiontripfurniture.org

It was written using the AWS Amplify framework to handle all the backened
resource provisioning. The api endpoints are GraphQL endpoints. The data storage
is in AWS DynamoDB and AWS S3 through the Amplify Framework. The front end is
written in react and material ui.

If you find any bugs or have any fixes please don't hesitate to open an issue or
a PR.

## Current Features

### Unauthenticated Access

1. Searching Plans
2. Viewing Plan Details
3. Downloading Plan PDF
4. Creating an Account

### Authenticated Access

1. All of the access as an unauthenticated user
2. Favoriting Plans
3. Viewing which Plans you have favorited
4. Viewing which Plans you have downloaded
5. Uploading new plans
