// import * as uuid from "uuid";
// import AWS from "aws-sdk";
// AWS.config.update({ region: "us-east-2" });
// const dynamoDb = new AWS.DynamoDB.DocumentClient();
import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };
  await dynamoDb.put(params);
  return params.Item;
});
//"noteId\":\"62bd16a0-86c5-11ea-a1f5-6142637c5dd6\"