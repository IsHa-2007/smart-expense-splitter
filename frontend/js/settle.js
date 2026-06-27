let currentGroupName = localStorage.getItem("currentGroup");
let groupData = JSON.parse(localStorage.getItem("group_" + currentGroupName));

function populateDropdowns() {
    let fromSelect = document.getElementById("fromSelect");
    let toSelect = document.getElementById("toSelect");

    groupData.members.forEach(function(member) {
        let option1 = document.createElement("option");
        option1.value = member;
        option1.textContent = member;
        fromSelect.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = member;
        option2.textContent = member;
        toSelect.appendChild(option2);
    });
}

document.getElementById("recordPaymentBtn").addEventListener("click", function() {
    let from = document.getElementById("fromSelect").value;
    let to = document.getElementById("toSelect").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (from === to) {
        alert("From and To cannot be the same person.");
        return;
    }

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let balances = calculateBalances(groupData.members, groupData.expenses, groupData.payments);

    let maxPossible = Math.min(Math.abs(balances[from]), balances[to]);

    if (amount > maxPossible) {
        alert("Amount too high. Maximum possible payment here is ₹" + maxPossible.toFixed(2));
        return;
    }

    let newPayment = {
        id: "p" + Date.now(),
        from: from,
        to: to,
        amount: amount
    };

    groupData.payments.push(newPayment);
    localStorage.setItem("group_" + currentGroupName, JSON.stringify(groupData));

    window.location.href = "group.html";
});

populateDropdowns();