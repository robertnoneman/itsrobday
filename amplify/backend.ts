import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { aws_dynamodb } from "aws-cdk-lib";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
export const backend = defineBackend({
  auth,
  data,
  storage,
});


const externalDataSourcesStack = backend.createStack("MyExternalDataSources");


const externalTable = aws_dynamodb.Table.fromTableName(
  externalDataSourcesStack,
  "MyExternalTodoTable",
  "Todo-fy7ofye6abfxbi2atx6hvmsgvm-NONE"
);

// "Todo-fy7ofye6abfxbi2atx6hvmsgvm-NONE"
// "TodoTable"

backend.data.addDynamoDbDataSource(
  "TodoTable",
  externalTable
);