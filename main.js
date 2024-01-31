const form = document.getElementById('form');
const input = document.getElementById('input');
const submitBtn = document.getElementById('submitBtn');
const listBox = document.getElementById('list-box')

const storageData = localStorage.getItem('todo');
let todoArr = storageData ? JSON.parse(storageData) : [];

window.addEventListener('load', getList())

// 로컬스토리지에 저장하기,
function saveInput() {
    const addTodo = [...todoArr, {
        text: input.value,
        check: false
    }]
    todoArr = addTodo;
    localStorage.setItem('todo',JSON.stringify(addTodo));
}

// 저장 후 불러들이는 함수 만들기
function getList() {
    const todoList = JSON.parse(localStorage.getItem('todo'));
    if(todoList) {
       const list = document.createElement('ul');
       list.className = 'list';
       listBox.appendChild(list);
        todoList.forEach((item, idx)=> {
           const li = document.createElement('li');
           li.id = idx;
           list.appendChild(li);
           li.innerHTML = `
           <label for="check">
           <input type="checkbox" id="check" data-idx=${idx}>
           <span>${item.text}</span>
       </label>
    <button data-idx=${idx}>
       삭제
    </button>
           `
    
        })
        input.value = '';
    }
}

function addItem() {
    saveInput();
    getList();
}

form.addEventListener('submit',(event) => {
    event.preventDefault();
    addItem();
})