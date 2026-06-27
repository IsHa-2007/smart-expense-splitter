
let currentGroupName = localStorage.getItem("currentGroup");
let groupData = JSON.parse(localStorage.getItem("group_" + currentGroupName));


document.getElementById("groupTitle").textContent = currentGroupName;


function displayBalances() {
    let balances = calculateBalances(groupData.members, groupData.expenses, groupData.payments);
    let balancesDiv = document.getElementById("balancesList");
    balancesDiv.innerHTML = "";

    let maxAbs = Math.max(...groupData.members.map(m => Math.abs(balances[m])), 1);

    groupData.members.forEach(function(member) {
        let amount = balances[member];

        let row = document.createElement("div");
        row.className = "balance-row";

        let nameSpan = document.createElement("span");
        nameSpan.className = "member-name";
        nameSpan.textContent = member;

        let track = document.createElement("div");
        track.className = "balance-track";

        let amountSpan = document.createElement("span");

        if (Math.abs(amount) < 0.01) {
            amountSpan.innerHTML = "<span class='settled-badge'>✓ Settled</span>";
        } else {
            let fill = document.createElement("div");
            let widthPercent = (Math.abs(amount) / maxAbs) * 45;
            fill.style.width = widthPercent + "%";

            if (amount > 0) {
                fill.className = "balance-fill credit";
                amountSpan.textContent = "+₹" + amount.toFixed(2);
                amountSpan.className = "amount-credit";
            } else {
                fill.className = "balance-fill debit";
                amountSpan.textContent = "−₹" + Math.abs(amount).toFixed(2);
                amountSpan.className = "amount-debit";
            }
            track.appendChild(fill);
        }

        row.appendChild(nameSpan);
        row.appendChild(track);
        row.appendChild(amountSpan);
        balancesDiv.appendChild(row);
    });
}

function displayTotalSpent() {
    let totalSpent = calculateTotalSpent(groupData.members, groupData.expenses);
    let container = document.getElementById("totalSpentList");
    container.innerHTML = "";

    let maxSpent = Math.max(...groupData.members.map(m => totalSpent[m]), 1);

    groupData.members.forEach(function(member) {
        let row = document.createElement("div");
        row.className = "spent-row";

        let nameSpan = document.createElement("span");
        nameSpan.className = "member-name";
        nameSpan.textContent = member;

        let track = document.createElement("div");
        track.className = "spent-track";

        let fill = document.createElement("div");
        fill.className = "spent-fill";
        fill.style.width = (totalSpent[member] / maxSpent) * 100 + "%";
        track.appendChild(fill);

        let amountSpan = document.createElement("span");
        amountSpan.className = "spent-amount";
        amountSpan.textContent = "₹" + totalSpent[member].toFixed(2);

        row.appendChild(nameSpan);
        row.appendChild(track);
        row.appendChild(amountSpan);
        container.appendChild(row);
    });
}
displayBalances();
displayTotalSpent();