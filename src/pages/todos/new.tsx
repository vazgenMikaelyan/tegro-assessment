import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "src/core/layouts/Layout";
import { CreateTodoSchema } from "src/todos/schemas";
import createTodo from "src/todos/mutations/createTodo";
import { TodoForm, FORM_ERROR } from "src/core/components/TodoForm";
import { Suspense } from "react";

const NewTodoPage = () => {
  const router = useRouter();
  const [createTodoMutation] = useMutation(createTodo);

  return (
    <Layout title={"Create New Todo"}>
      <h1>Create New Todo</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoForm
          submitText="Create Todo"
          schema={CreateTodoSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const todo = await createTodoMutation(values);
              await router.push(Routes.ShowTodoPage({ todoId: todo.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.TodosPage()}>Todos</Link>
      </p>
    </Layout>
  );
};

NewTodoPage.authenticate = true;

export default NewTodoPage;
