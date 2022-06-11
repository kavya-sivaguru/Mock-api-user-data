function createUser(user){
    const userList = document.querySelector(".user-list")
    userList.innerHTML += 
    `<div class="user-container">
                <img class="user-avatar" src=${user.avatar} alt="${user.name}" >
                <div class="user-specs">
                <button onclick="editUser(${user.id})">Edit</button>
                <h4 class="user-name">${user.name}</h4>
                <p class="user-joined">${new Date(user.createdAt).toDateString()}</p>
                <button onclick="deleteUser(${user.id})">Delete</button>
                </div>
            </div>`
}

function loadUsers(){
    const userList = document.querySelector(".user-list")
    userList.innerHTML = ""
    fetch("https://629c4033e9358232f75815aa.mockapi.io/users")
    .then(response => response.json())
    .then((data) => {
        data.forEach((item) => {
            createUser(item)
        })
    })
}
loadUsers()

// Step 1 : edit button clicked - grab values from api and paste in input fields
// PUT - get id of the item you want to update from onClick event and pass in the fun as parameter
function editUser(id){
    fetch(`https://629c4033e9358232f75815aa.mockapi.io/users/${id}`)
    .then(response => response.json())
    .then((data)=> {
        const uname = data.name;
        const upic = data.avatar;
        const uid = data.id;
        console.log(uname, upic, uid)
        document.querySelector(".user-name").value = uname
        document.querySelector(".user-pic").value = upic
        document.querySelector(".hidden").value = uid
    })
    
    // console.log(id)
}

// POST
// step 1 = method:POST
// step 2 = information displayed on body should be JSON
// step 2 = in the headers we should mention content is JSON data type
function addUser(){
    
    const userName = document.querySelector(".user-name").value
    const userPic = document.querySelector(".user-pic").value
    const id = document.querySelector(".hidden").value;
    // id will have value only when edit button is clicked so if id is not equal to empty - edit user or else - add new user    
    if (id !== ""){
        // edit user
        fetch(`https://629c4033e9358232f75815aa.mockapi.io/users/${id}`,{
            method:"PUT",
            body: JSON.stringify({name: userName, avatar:userPic}),
            headers: {"Content-Type": "application/json"}
        }).then(()=>loadUsers())
        alert(`user updated ${userName},${userPic}`)
    
    } else {
        // add new user
        fetch(`https://629c4033e9358232f75815aa.mockapi.io/users/`, {
            method: "POST",
            // convert JS obj to JSON = JSON stringify
            body: JSON.stringify({name: userName, avatar:userPic}),
            headers: {"Content-Type": "application/json"}
        }).then(() => loadUsers())
        alert(`user added ${userName},${userPic}`)
        }
        
        // remove contents from input fields after submission
        document.querySelector(".user-name").value = ""
        document.querySelector(".user-pic").value = ""
    }
    
// DELETE
// Step 1 = grab the id and append the id to the url 
// Step 2 = call the DELETE method on item 
// Step 3 = print the remaining items on list 

function deleteUser(id){
    fetch(`https://629c4033e9358232f75815aa.mockapi.io/users/${id}`, {method: "DELETE"})
    .then(() => loadUsers())
    alert(`user deleted! , ${id}`);
}








