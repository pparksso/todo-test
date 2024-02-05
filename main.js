const form = document.getElementById('form');
const input = document.getElementById('input');
const submitBtn = document.getElementById('submitBtn');
const listBox = document.getElementById('list-box');
const list = document.getElementById('list');
const storageData = localStorage.getItem('todo');
let todoArr = storageData ? JSON.parse(storageData) : [];

window.addEventListener('load', getList());

// 배열에서 제일 큰 아이디를 가진 객체의 아이디 + 1 을 아이디로 지정
// 로컬스토리지에 저장하기
function saveInput() {
    let id;
    if(todoArr.length > 0) {
        const list = [...todoArr];
        const maxItem = list.reduce((acc, cur) => {
            return cur.id > acc.id ? cur : acc;
        })
        id = maxItem.id;
    } 
    const addTodo = [...todoArr, {
        id: id ? id + 1 : 1,
        text: input.value,
        check: false
    }]
    todoArr = addTodo;
    localStorage.setItem('todo',JSON.stringify(addTodo));
}

// 저장 후 불러들이는 함수 만들기
function getList() {
    if(todoArr) {
        list.innerHTML = ``;
        todoArr.forEach((item, idx)=> {
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
           checkBox.dataset.idx = idx;
           checkBox.checked = item.check;
           checkBox.className = 'checkBox';
           span.innerHTML = item.text;
           delBtn.dataset.id = item.id;
           delBtn.innerHTML = '삭제';
           list.appendChild(li);
           li.appendChild(label);
           label.appendChild(checkBox);
           label.appendChild(span);
           li.appendChild(delBtn);
           checkBox.addEventListener('click', (e) => {changeCheckVal(e)});
           delBtn.addEventListener('click',(e) => {removeItemHandler(e)});
        });
        input.value = '';
    }
}

function addItem() {
    saveInput();
    getList();
}

// 변경사항 저장
function changeCheckVal(e) {
    const idx = e.target.dataset.idx;
    const checkVal = e.target.checked;
    const copyList = [...todoArr];
    copyList[idx].check = checkVal;
    localStorage.setItem('todo',JSON.stringify(copyList));
    todoArr = copyList;
    getList();
}

// 삭제
function removeItemHandler(e) {
    const id = parseInt(e.target.dataset.id);
    const newList = [...todoArr].filter((item) => {
        return item.id !== id;
    })
    localStorage.setItem('todo',JSON.stringify(newList));
    todoArr = newList;
    getList();
};

form.addEventListener('submit',(event) => {
    event.preventDefault();
    addItem();
});

