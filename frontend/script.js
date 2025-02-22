//  start from here
document.addEventListener("DOMContentLoaded", fetchTodos);

async function signup(event) {
    event.preventDefault(); 

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // console.log("Sending request:", username, password);

    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/signup", {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // console.log("Response:", response.data);
        if (response.status === 201) {
            window.location.href = "/frontend/login.html"; 
        } else {
            alert("Signup failed. Please try again.");
        }
    } catch (error) {
        // console.error("Error during signup:", error);
        alert("Signup failed: " + (error.response?.data?.message || "Something went wrong!"));
    }
}



async function signin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter both email and password.");
        return;
    }

    // console.log("Signing in with:", username, password);

    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/signin", {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // console.log("Response:", response.data);

        const token = response.data.token;
        localStorage.setItem("token", token);

        if (response.status === 200) {
            window.location.href = '/frontend/homepage.html'; 
        }
    } catch (error) {
        // console.error("Error during signin:", error);
        alert("Signin failed: " + (error.response?.data?.message || "Something went wrong!"));
    }
}


async function fetchTodos() {
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }

    try {
        const response = await axios.get("http://localhost:3000/api/v1/todos/fetchAll", {
            headers: {
                Authorization: `${token}`,
            },
        });

        const todos = response.data;
        // console.log(todos);
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = ""; 

        todos.forEach(todo => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");
            todoItem.textContent = todo.text;

            if (todo.completed) {
                todoItem.classList.add("completed");
            }

            todoItem.addEventListener("click", async () => {
                await toggleTodoCompletion(todo._id, !todo.completed);
                fetchTodos(); 
            });

            todoList.appendChild(todoItem);
        });
    } catch (error) {
        // console.error("Error fetching todos:", error);
        alert("Failed to fetch todos");
    }
}

async function toggleTodoCompletion(todoId, completed) {
    const token = localStorage.getItem("token");
    try {
        await axios.patch(`http://localhost:3000/api/v1/todos/update/${todoId}`, 
            { completed }, 
            {
                headers: { Authorization: `${token}` },
            }
        );
    } catch (error) {
        // console.error("Error updating todo:", error);
        alert("Failed to update todo status");
    }
}


async function addTodo() {
    const input = document.getElementById("todoInput");
    const todoText = input.value.trim();
    if (todoText === "") return;

    const token = localStorage.getItem("token");
    // console.log(token);

    if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:3000/api/v1/todos/add",
            { text: todoText },
            {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // console.log("Response:", response.data);
        input.value = ""; 

        // Refresh todo list after adding
        fetchTodos();
    } catch (error) {
        // console.error("Error adding todo:", error);
        alert("Failed to add todo");
    }
}


function logout(event) {
    event.preventDefault(); 
    localStorage.removeItem('token');
    window.location.href = "/frontend/login.html";
}

