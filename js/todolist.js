/**
 * 1. 输入按回车，今日事项中新增输入内容
 * 2. 点击小圆点，删除事项；待办事项选中则进入已完成
 * 3. 已完成的取消打勾，又回到待办事项中
 * 4. 用本地存储数据
*/

let todoInp = document.querySelector('#todolist');
let titleInp = document.querySelector('#title');

getData();

// 回车新增数据
titleInp.addEventListener('keyup', function (e) {

    if (e.keyCode === 13) {

        let title = titleInp.value.trim();
        let data = JSON.parse(getData());

        data.push({
            title: title,
            done: false,
        });

        let localData = data;

        setData(localData);
        render(data);

    }

})

// 选择 a 并添加删除事件
function getElements() {
    let delBtns = document.querySelectorAll('#todolist a');
    delBtns.forEach((delBtn, index) => {
        delBtn.addEventListener('click', function () {

            let data = JSON.parse(getData());
            data.splice(index, 1);

            setData(data);
            render(data);

        })
    });
}
// 将数据存储到本地
function setData(localData) {
    localStorage.setItem('localData', JSON.stringify(localData));
}

// 获取本地数据
function getData() {
    
    let data = localStorage.getItem('localData');
    render(JSON.parse(data));
    return data === null ? '[]' : data;
    
}

// 通过获取数据渲染页面
function render(data) {

    if (data === null) {
        return;
    }

    let li = '';
    data.forEach(item => {
        li += `
            <li>
                <input type="checkbox" name="" id=""> ${ item.title } <a href="javascript:;"></a>
            </li>
        `;
    });

    todoInp.innerHTML = '';
    todoInp.innerHTML = li;

    getElements();
}

