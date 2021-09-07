
let todolist = document.querySelector('#todolist');
let donelist = document.querySelector('#donelist');
let input = document.querySelector('#title');

let localData = new LocalData();
localData.dataKey = 'todolist';
let data = localData.readData();

render();

// 回车添加数据
input.addEventListener('keyup', function (e) {

    if (e.keyCode === 13) {

        localData.addData({
            content: this.value,
            done: false,
        })

        data = localData.readData();

        render();

        this.value = '';

    }

})

todolist.addEventListener('click', function (e) {

    // 获取元素节点名, 并用 toLowerCase() 方法转为小写
    let button = e.target.nodeName.toLowerCase();

    if (button === 'input') {
        let index = e.target.id
        setCheckbox(index)
    }

    if (button === 'a') {
        let id = Number(e.target.id);
        delData(id);
    }

})

donelist.addEventListener('click', function (e) {

    let button = e.target.nodeName.toLowerCase();

    if (button === 'input') {
        let index = e.target.id;
        setCheckbox(index);
    }

    if (button === 'a') {
        let id = Number(e.target.id);
        delData(id);
    }

})

// 点击复选框完成或返回todolist
function setCheckbox(index) {

    data[index].done = !data[index].done;
    localData.saveData(data);
    data = localData.readData();
    render();

}

// 删除
function delData(id) {

    localData.removeDataById(id);
    data = localData.readData();
    render();

}

// 渲染
function render() {

    let olStr = ``;
    let ulStr = ``;

    data.forEach((element, index) => {

        if (!element.done) {
            olStr += `
                <li>
                    <input type="checkbox" id="${index}">
                    ${element.content}
                    <a href="javascript:;" id="${element.id}"></a>
                </li> 
            `;
        } else {
            ulStr += `
                <li>
                    <input type="checkbox" id="${index}" checked>
                    ${element.content}
                    <a href="javascript:;" id="${element.id}"></a>
                </li> 
            `;
        }


    });

    todolist.innerHTML = '';
    donelist.innerHTML = '';

    todolist.innerHTML = olStr;
    donelist.innerHTML = ulStr;

}




