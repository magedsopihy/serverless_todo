import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';
import { TodoItem } from '../../models/TodoItem'

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    try{
      const todos = (await getTodosForUser(getUserId(event))) as TodoItem[]

      return {
        statusCode: 200,
        body: JSON.stringify({
          items: todos
        })
      }

    }catch{
     return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Todo does not exist '
        }) 
      }
    }  
  })

handler.use(
  cors({
    credentials: true
  })
)
