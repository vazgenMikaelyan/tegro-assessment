import { useRouter } from "next/router";
import { Routes } from "@blitzjs/next";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import getTodos from "src/todos/queries/getTodos";
import deleteTodo from "src/todos/mutations/deleteTodo";
import updateTodo from "src/todos/mutations/updateTodo";

const ITEMS_PER_PAGE = 100;

export default function TodosList() {

    const router = useRouter();
    const [deleteTodoMutation] = useMutation(deleteTodo);
    const [updateTodoMutation] = useMutation(updateTodo);
    const page = Number(router.query.page) || 0;

    const [{ todos, hasMore }] = usePaginatedQuery(getTodos, {
        orderBy: { id: "desc" },
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
    });

    const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
    const goToNextPage = () => router.push({ query: { page: page + 1 } });

    if (!todos.length) {
        return (
            <div>
                There are no todo items yet,
                you can add them manually or run the <b>blitz db seed</b> command
            </div>
        )
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Created Date</th>
                            <th scope="col" className="px-6 py-3">Updated Date</th>
                            <th scope="col" className="px-6 py-3">Completed</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(todo => {
                                return (
                                    <tr key={todo.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">
                                            {todo.name}
                                        </td>
                                        <td className="px-6 py-4">{todo.updatedAt.toLocaleDateString('en-GB')}</td>
                                        <td className="px-6 py-4">{todo.createdAt.toLocaleDateString('en-GB')}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center mb-4">
                                                <input
                                                    type="checkbox"
                                                    value={todo.id}
                                                    checked={todo.isCompleted}
                                                    onChange={async () => {
                                                        if (window.confirm(`Are you sure you want to change the status of ${todo.name} todo`)) {
                                                            await updateTodoMutation({ id: todo.id, isCompleted: !todo.isCompleted, name: todo.name });
                                                            router.reload()
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex  rounded-md shadow-sm" role="group">
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        if (window.confirm(`Are you sure you want to delete ${todo.name} todo`)) {
                                                            await deleteTodoMutation({ id: todo.id });
                                                            router.reload()
                                                        }
                                                    }}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                                    <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                    </svg>
                                                    Delete
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        router.push(Routes.EditTodoPage({ todoId: todo.id }))
                                                    }}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                                    <svg className="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                    </svg>
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
            <div className="flex justify-center my-5">
                {
                    (page !== 0) ? (
                        <button
                            onClick={goToPreviousPage}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Prev
                        </button>
                    ) : null
                }
                {
                    hasMore ? (
                        <button
                            onClick={goToNextPage}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                            Next
                        </button>
                    ) : null
                }
            </div>
        </>
    )
}
