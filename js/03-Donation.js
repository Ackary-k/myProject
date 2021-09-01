
// 受捐企业数据
let orgData = [
    {
        orgID: 1,
        orgName: '壹基金',
    },
    {
        orgID: 2,
        orgName: '慈济基金',
    },
    {
        orgID: 3,
        orgName: '宋庆龄基金',
    },
    
]

// 捐赠数据
let donationData = [
    {
        id: 1,
        pname: '李连杰',
        orgID: orgData[0].orgID,
        aomunt: 8000000,
        date: '2023-01-17',
    },
    {
        id: 2,
        pname: '成龙',
        orgID: orgData[1].orgID,
        aomunt: 1000000,
        date: '2020-01-20',
    },
    {
        id: 3,
        pname: '甄子丹',
        orgID: orgData[2].orgID,
        aomunt: 500000,
        date: '2022-11-01',
    },
    {
        id: 4,
        pname: '梁朝伟',
        orgID: orgData[1].orgID,
        aomunt: 200000,
        date: '2021-02-17',
    },
    {
        id: 5,
        pname: '周润发',
        orgID: orgData[0].orgID,
        aomunt: 300000,
        date: '2023-03-27',
    },
]

let newData = [];

let selAddOrg = document.querySelector('#selAddOrg');
let selSearchOrg = document.querySelector('#selSearchOrg');
let btnSearch = document.querySelector('#btnSearch');
let btnAdd = document.querySelector('#btnAdd');
let spanPageCount = document.querySelector('#spanPageCount');
let tbody = document.querySelector('#tbody');

init();


// 查询按钮点击事件
btnSearch.addEventListener('click', function () {

    let id = Number(selSearchOrg.value);

    if (id == -1) {
        return renderTable(donationData);
    }

    donationData.forEach(item => {
        if (item.orgID == id) {
            newData.push(item);
        }
    });

    renderTable(newData);
    newData = [];

});


// 新增按钮点击事件
btnAdd.addEventListener('click', function () {

    addDonationData();
    renderTable(donationData);

});


// 删除/修改 按钮点击事件  事件委托
tbody.addEventListener('click', function (e) {
    
    let deleteBtn = e.target.className.toLowerCase();
    let editBtn = e.target.className.toLowerCase();
    let index = e.target.getAttribute('data-id')

    if (deleteBtn === 'delete') {
        donationData.splice(index, 1);
        renderTable(donationData);
    }

    if (editBtn === 'edit-btn') {

        let thisParentNode = e.target.parentNode.parentNode;

        let pname = thisParentNode.querySelector('#pname');
        let orgName = thisParentNode.querySelector('#orgName');
        let amount = thisParentNode.querySelector('#amount');
        let date = thisParentNode.querySelector('#date');
        let operate = thisParentNode.querySelector('#operate');

        pname.innerHTML = `<input type="text" id="con-pname" value="${ pname.innerText }" />`;
        orgName.innerHTML = `<input type="text" id="con-orgNamme" value="${ orgName.innerText }" />`;
        amount.innerHTML = `<input type="text" id="con-amount" value="${ amount.innerText }" />`;
        date.innerHTML = `<input type="text" id="con-date" value="${ date.innerText }" />`;
        operate.innerHTML = ` <a href="javascript:;" id="confirm-btn">确认</a>&nbsp;&nbsp;
        <a href="javascript:;" id="cancel-btn">取消</a>`;

        let confirmBtn = thisParentNode.querySelector('#confirm-btn');
        let cancelBtn = thisParentNode.querySelector('#cancel-btn');

        // 确认操作
        confirmBtn.addEventListener('click', function () {

            let conPname = thisParentNode.querySelector('#con-pname');
            let conOrgName = thisParentNode.querySelector('#con-orgNamme');
            let conAmount = thisParentNode.querySelector('#con-amount');
            let conDate = thisParentNode.querySelector('#con-date');

            console.log(conPname.value,conOrgName.value,conAmount.value,conDate.value);
            console.log(donationData[index]);

        })

        // 取消操作
        cancelBtn.addEventListener('click', function () {
            renderTable(donationData);
        })
        
    }

})

// 初始化数据
function init() {
    
    let options = '';
    
    // 创建 option 元素
    orgData.forEach( (item, index) => {
        
        options += `<option value="${ index + 1 }">${ item.orgName }</option>`;

    });

    selSearchOrg.innerHTML += options;
    selAddOrg.innerHTML = options;

    renderTable(donationData);

}

// 渲染表格
function renderTable(data) {

    let str = '';
    
    // 创建 tbody 子元素
    data.forEach( (item, index) => {
        str += `
        <tr>
            <td>
                <input type="checkbox">
                全选
            </td>
            <td>${ item.id }</td>
            <td id="pname">${ item.pname }</td>
            <td id="orgName">${ orgData[item.orgID - 1].orgName }</td>
            <td id="amount">${ item.aomunt }</td>
            <td id="date">${ item.date }</td>
            <td id="operate">
                <a href="javascript:;" class="delete" data-id="${ index }">删除</a>&nbsp;&nbsp;
                <a href="javascript:;" class="edit-btn">修改</a>
            </td>
        </tr>
        `;
        
    })

    tbody.innerHTML = '';
    tbody.innerHTML = str;

}

// 添加捐款人
function addDonationData() {
    
    let pname = document.querySelector('#txtName').value.trim();
    let orgID = Number(selAddOrg.value);
    let aomunt = document.querySelector('#txtMoney').value.trim();
    let date = document.querySelector('#txtDate').value.trim();
    
    let obj = {
        id: donationData.length + 1,
        pname,
        orgID,
        aomunt,
        date,
    }

    donationData.push(obj);

}