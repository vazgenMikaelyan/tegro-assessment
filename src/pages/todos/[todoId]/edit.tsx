import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getTodo from "src/todos/queries/getTodo";
import updateTodo from "src/todos/mutations/updateTodo";
import { TodoForm } from "src/core/components/TodoForm";

export const EditTodo = () => {
  const router = useRouter();
  const todoId = useParam("todoId", "number");
  const [todo, { setQueryData }] = useQuery(
    getTodo,
    { id: todoId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateTodoMutation] = useMutation(updateTodo);

  return (
    <>
      <Head>
        <title>Edit Todo {todo.id}</title>
      </Head>

      <div>
        <h1>Edit Todo by id {todo.id}</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoForm
            submitText="Update"
            initialValues={todo.name}
            onSubmit={async (values) => {
              try {
                console.log(values)
                const updated = await updateTodoMutation({
                  ...todo,
                  ...values,
                });
                await setQueryData(updated);
                await router.push(Routes.Home());
              } catch (error: any) {
                console.error(error);
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};

const EditTodoPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTodo />
      </Suspense>
    </div>
  );
};

EditTodoPage.authenticate = false;
EditTodoPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditTodoPage;
