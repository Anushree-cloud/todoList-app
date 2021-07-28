const list = document.getElementById("unorderList") //retrieving unorderlist
const itemName = document.getElementById("itemName") //retrieving input
const counter = document.getElementById("counter")//retriving footer div
const addItemBtn = document.getElementById("addItem") //retrieving button
const closeAllBtn = document.getElementById("closeAllBtn")
const toast = document.getElementById("toast")

addItemBtn.addEventListener("click", () => {
    toast.className = "toastClass"
    if (itemName.value === ''){
        alert("add something 1st!")
    }
    else
        addItems();
})

function showTotalCount() {
    counter.innerHTML = countItems() // 👈 Already returns string not need to wrap it inside a template string
}

showTotalCount(); // use this instead of wirting everytime in code counter.innerHTML = countItems(); follow DRY (Do not repeat your) code structure, use functions whenever you can

function addItems() {
    let newItem = createNewItem()
    let newItemText = createNewItemText()
    let deleteBtn = createDeleteBtn()
    let editBtn = createEditBtn()
    let check = createCheck()
    let completed = completedTask()
    let input = createInput()
    let updateBtn = createUpdateBtn()

    deleteBtn.addEventListener('click', () => { removeItem(newItem) })
    check.addEventListener('change', () => {
        if (check.checked) {
            
            newItemText.style.textDecoration = "line-through"
            newItemText.style.textDecorationColor = "black"
            completed.innerHTML = "completed!"
            newItem.appendChild(completed)
        }
        else{
            newItemText.style.textDecoration = "none"
            completed.innerHTML = ""
        }
            
    })


    input.style.display = "none";  // 👈 by default display none
    updateBtn.style.display = "none"; // 👈 by default display none


    newItem.appendChild(check)
    newItem.appendChild(newItemText)
    newItem.appendChild(deleteBtn)
    newItem.appendChild(editBtn)
    newItem.appendChild(input); // 👈 append
    newItem.appendChild(updateBtn); // 👈 append

    list.appendChild(newItem);

    showTotalCount();

    editBtn.addEventListener('click', () => {
        input.value = newItemText.innerText;
        newItemText.style.display = "none";
        editBtn.style.display = "none"
        deleteBtn.style.display = "none"
        check.style.display = "none"
        input.style.display = "inline"
        updateBtn.style.display = "inline"
    });

    updateBtn.addEventListener('click', () => {
        newItemText.innerHTML = input.value //adding input value to the itemText

        input.style.display = "none"
        updateBtn.style.display = "none"

        newItemText.style.display = "inline";
        editBtn.style.display = "inline"
        deleteBtn.style.display = "inline"
        check.style.display = "inline"
    });

    newItemText.innerHTML = itemName.value //adding input value the itemText
    itemName.value = ""
}

function createNewItem() {
    let newItem = document.createElement('li') // creating new list elements
    return newItem;
}

function createNewItemText() {
    let newItemText = document.createElement('span')
    newItemText.id = "itemText"
    return newItemText
}

function createDeleteBtn() {
    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = "Delete"
    deleteBtn.className = "buttons delete"
    return deleteBtn
}

function removeItem(newItem) {
    newItem.remove()
    showTotalCount();
}

function createEditBtn() {
    let editBtn = document.createElement('button')
    editBtn.innerHTML = "Edit"
    editBtn.className = "buttons edit"
    return editBtn
}

function createCheck() {
    let check = document.createElement('input')
    check.type = "checkbox"
    check.className = 'check'
    return check
}

function completedTask() {
    let completed = document.createElement('span')
    completed.className = "completed"
    return completed
}

function clearAll() {
    const listArray = Array.from(list.querySelectorAll("li"))
    listArray.forEach((element) => {
        element.remove()
    });
    showTotalCount();
}

function countItems() {
    let totalCount = document.querySelectorAll("li").length
    if (Number(totalCount) === 0){
        closeAllBtn.disabled = true
        return "No task in the list yet!"
    }
    else{
        closeAllBtn.disabled = false
        closeAllBtn.addEventListener("click", () => { clearAll() })
        return `No. of Tasks in the List: ${totalCount}`
    }
}

function createInput() {
    let input = document.createElement('input')
    input.id = "editInput"
    return input;
}

function createUpdateBtn() {
    let updateBtn = document.createElement('button')
    updateBtn.innerText = "Update"
    updateBtn.className = "buttons update"
    return updateBtn
}