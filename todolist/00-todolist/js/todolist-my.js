let todolist = document.querySelector('#todolist');
let donelist = document.querySelector('#donelist');

let localData = new LocalData();
localData.dataKey = 'todolist';
let data = localData.readData();

init();

let input = document.querySelector('#title');

input.addEventListener('keyup', function(e) {

    if (e.keyCode === 13) {

        localData.addData({
            content: this.value,
            done: false,
        })

        data = localData.readData();

        init();
        
    }

})

todolist.addEventListener('click', function (e) {

    let button = e.target.nodeName.toLowerCase();
    

    if(button === 'input') {
        let index = e.target.id
        data[index].done = !data[index].done;
        localData.saveData(data);
        data = localData.readData()
        init();
    }

    if(button === 'a') {
        
        let id = e.target.id;
        // localData.removeDataById(id);
        data.splice(id, 1)
        localData.saveData(data);

        init();
        console.log(data);
    }
    

})

donelist.addEventListener('click', function (e) {

    let button = e.target.nodeName.toLowerCase();

    if(button === 'input') {
        let index = e.target.id
        data[index].done = !data[index].done;
        localData.saveData(data);
        data = localData.readData()
        init();
    }

    if(button === 'a') {
        let id = e.target.id
        // localData.removeDataById(id);
        data.splice(id, 1)
        localData.saveData(data);
        init();
    }
    

})



function init() {

    let olStr = ``;
    let ulStr = ``;
    
    data.forEach((element, index) => {

        if (!element.done) {
            olStr += `
                <li>
                    <input type="checkbox" id="${ index }">
                    ${ element.content }
                    <a href="javascript:;" id="${ index }"></a>
                </li> 
            `;
        } else {
            ulStr += `
                <li>
                    <input type="checkbox" id="${ index }" checked>
                    ${ element.content }
                    <a href="javascript:;" id="${ element.id }"></a>
                </li> 
            `
        }
        
        
    });

    todolist.innerHTML = '';
    donelist.innerHTML = '';

    todolist.innerHTML = olStr;
    donelist.innerHTML = ulStr;

}




