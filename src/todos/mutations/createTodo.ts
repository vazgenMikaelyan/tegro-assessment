import { resolver } from "@blitzjs/rpc";
import db from "db";
import { CreateTodoSchema } from "../schemas";

export default resolver.pipe(
  resolver.zod(CreateTodoSchema),
  async (input) => {
    const todo = await db.todo.create({ data: input});
    return todo;
  }
);
