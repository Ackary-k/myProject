/**
 * 1. 输入按回车，今日事项中新增输入内容
 * 2. 点击小圆点，删除事项；待办事项选中则进入已完成
 * 3. 已完成的取消打勾，又回到待办事项中
 * 4. 用本地存储数据
*/

let titleInp = document.querySelector('#title');
let todolist = document.querySelector('#todolist');
let donelist = document.querySelector('#donelist');

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

        titleInp.value = '';

    }

})

// 选择元素
function getElements() {

    let delBtns = document.querySelectorAll('#todolist a, #donelist a');
    let checkboxes = document.querySelectorAll('#todolist input, #donelist input');
    
    delData(delBtns);
    setCheckbox(checkboxes);

}

function setCheckbox(checkboxes) {
    checkboxes.forEach( checkbox => {

        checkbox.addEventListener('click', function () {
            
            let data = JSON.parse(getData());
            let index = this.getAttribute('id');
            // 数组和对象值得调用！！！ 注意哦
            data[index].done = !data[index].done;
            setData(data);
            render(data);
        });

    });
}

// 删除
function delData(delBtns) {
    delBtns.forEach((delBtn, index) => {
        delBtn.addEventListener('click', function () {

            let data = JSON.parse(getData());
            data.splice(index, 1);

            setData(data);
            render(data);

        });
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

    let todo_li = '';
    let done_li = '';

    data.forEach((item, index) => {
        if (!item.done) {
            todo_li += `
                <li>
                    <input type="checkbox" name="" id="${ index }"> ${ item.title } <a href="javascript:;"></a>
                </li>
            `;
        } else {
            done_li += `
                <li>
                    <input type="checkbox" checked name="" id="${ index }"> ${ item.title } <a href="javascript:;"></a>
                </li>
            `;
        }
    });

    todolist.innerHTML = '';
    donelist.innerHTML = '';
    
    todolist.innerHTML = todo_li;
    donelist.innerHTML = done_li;

    getElements();
}

