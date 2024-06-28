import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 20; i++) {
    await db.todo.create({ data: { name: "todo " + i,  } })
  }
}

export default seed

