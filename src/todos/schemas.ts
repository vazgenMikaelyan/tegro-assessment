import { z } from "zod";

export const CreateTodoSchema = z.object({
  name:z.string(),
});
export const UpdateTodoSchema = CreateTodoSchema.merge(
  z.object({
    id: z.number(),
    name:z.string(),
    isCompleted: z.boolean()
  })
);

export const DeleteTodoSchema = z.object({
  id: z.number(),
});
