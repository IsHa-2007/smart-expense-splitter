let currentGroupName = localStorage.getItem("currentGroup");
let groupData = JSON.parse(localStorage.getItem("group_" + currentGroupName));


function populateMembers() {
    let paidBySelect = document.getElementById("paidBy");
    let splitDiv = document.getElementById("splitAmongList");

    groupData.members.forEach(function(member) {
        
        let option = document.createElement("option");
        option.value = member;
        option.textContent = member;
        paidBySelect.appendChild(option);

       
        let label = document.createElement("label");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = member;
        checkbox.checked = true;

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + member));
        splitDiv.appendChild(label);
        splitDiv.appendChild(document.createElement("br"));
    });
}


document.getElementById("saveExpenseBtn").addEventListener("click", function() {
    let description = document.getElementById("description").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let paidBy = document.getElementById("paidBy").value;


    let checkboxes = document.querySelectorAll("#splitAmongList input[type='checkbox']");
    let splitAmong = [];
    checkboxes.forEach(function(cb) {
        if (cb.checked) {
            splitAmong.push(cb.value);
        }
    });

    if (!description || !amount || splitAmong.length === 0) {
        alert("Please fill all fields and select at least one person to split among.");
        return;
    }

    let newExpense = {
        id: "e" + Date.now(),
        paidBy: paidBy,
        amount: amount,
        splitAmong: splitAmong,
        description: description
    };

    groupData.expenses.push(newExpense);
    localStorage.setItem("group_" + currentGroupName, JSON.stringify(groupData));

    window.location.href = "group.html";
});

populateMembers();