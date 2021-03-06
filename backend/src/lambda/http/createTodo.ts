import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Creating new TODO:  ', { ...event })
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    try {
      const userId = getUserId(event)
      const todo = await createTodo(userId, newTodo)

      return {
        statusCode: 201,
        body: JSON.stringify({
          item: todo
        })
      }
    } catch {

      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "error while creating new todo"
        })
      }

    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
