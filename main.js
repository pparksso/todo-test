const form = document.getElementById('form');
const input = document.getElementById('input');
const submitBtn = document.getElementById('submitBtn');
const listBox = document.getElementById('list-box');
const list = document.getElementById('list');
const storageData = localStorage.getItem('todo');
let todoArr = storageData ? JSON.parse(storageData) : [];

window.addEventListener('load', getList())

// 로컬스토리지에 저장하기,
function saveInput() {
    const addTodo = [...todoArr, {
        id: todoArr.length + 1,
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
        list.innerHTML = ``;
        todoList.forEach((item, idx)=> {
           const li = document.createElement('li');
           const label = document.createElement('label');
           const checkBox = document.createElement('input');
           const span = document.createElement('span');
           const delBtn = document.createElement('button');
           li.id = 'item'+item.id;
           label.htmlFor = 'c'+item.id;
           checkBox.type = 'checkbox';
           checkBox.id = 'c' + item.id;
           checkBox.dataset.id = item.id;
           checkBox.className = 'checkBox';
           span.innerHTML = item.text;
           delBtn.dataset.id = item.id;
           delBtn.innerHTML = '삭제';
           list.appendChild(li);
           li.appendChild(label);
           label.appendChild(checkBox);
           label.appendChild(span);
           li.appendChild(delBtn);
           checkBox.addEventListener('click', (e) => {changeChechVal(e)});
        });
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

// 체크
// 클릭 한 노드의 data값을 추출하여 로컬스토리지에 저장..


// 삭제
// 클릭 한 노드의 data값을 추출하여 해당 아이템 삭제 후 로컬스토리지에 저장, 호출
