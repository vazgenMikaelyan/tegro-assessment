import db from "db"
// export default async function getCurrentUser(_ = null, { session }: Ctx) {
//     if (!session.userId) return null
  
//     const user = await db.user.findFirst({
//       where: { id: session.userId },
//       select: { id: true, name: true, email: true, role: true },
//     })
  
//     return user
//   }
  
export default async function getTodoList() {
    const todos = await db.todo.findMany();
    return todos;
}