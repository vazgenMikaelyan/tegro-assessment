import { Suspense } from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router";

import Layout from "src/core/layouts/Layout"
import TodosList from "src/core/components/TodosList"
import { TodoForm } from "src/core/components/TodoForm"
import createTodo from "src/todos/mutations/createTodo";
import { useMutation } from "@blitzjs/rpc";


const Home: BlitzPage = () => {
  const router = useRouter();
  const [createTodoMutation] = useMutation(createTodo);
  return (
    <Layout title='ToDo list'>
      <Suspense fallback="Loading...">
        <TodoForm
          submitText="Update"
          initialValues={''}
          onSubmit={async (values) => {
            console.log(values)
            try {
              const updated = await createTodoMutation({
                ...values,
              });
              router.reload()
            } catch (error: any) {
              console.error(error);
            }
          }}
        />
        <TodosList />
      </Suspense>
    </Layout>
  )
}

export default Home;
