
async function getAllTodos() {
    const response = await fetch('https://playground.4geeks.com/todo/users/kevin', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    return data.todos.map(todo => ({
        label: todo.label, 
        done: todo.is_done,
        id: todo.id
    }))
;}

async function createTodo(userName, todo) {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            label: todo.label,
            is_done: todo.done
        })
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }

async function updateTodo(todoId, todo) {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            label: todo.label,
            is_done: todo.done
        })
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
}

async function deleteTodo(todoId) {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.ok

}

async function clearAllTodos(userName)
 {
    const todos = await getAllTodos(userName);
    await Promise.all(todos.map(todo => deleteTodo(todo.id)));
    console.log("all todos cleared")
 }

export { getAllTodos, createTodo, updateTodo, deleteTodo, clearAllTodos }