let currentGroupName = localStorage.getItem("currentGroup");
let groupData = JSON.parse(localStorage.getItem("group_" + currentGroupName));

function displayExpenseHistory() {
    let container = document.getElementById("expenseHistory");
    if (groupData.expenses.length === 0) {
        container.innerHTML = "<p>No expenses recorded yet.</p>";
        return;
    }
    groupData.expenses.forEach(function(exp) {
        let div = document.createElement("div");
        div.className = "history-card expense";
        div.textContent = exp.paidBy + " paid ₹" + exp.amount.toFixed(2) + " for " + exp.description + " (split among: " + exp.splitAmong.join(", ") + ")";
        container.appendChild(div);
    });
}

function displayPaymentHistory() {
    let container = document.getElementById("paymentHistory");
    if (groupData.payments.length === 0) {
        container.innerHTML = "<p>No payments recorded yet.</p>";
        return;
    }
    groupData.payments.forEach(function(pay) {
        let div = document.createElement("div");
        div.className = "history-card payment";
        div.textContent = pay.from + " paid " + pay.to + " ₹" + pay.amount.toFixed(2);
        container.appendChild(div);
    });
}

displayExpenseHistory();
displayPaymentHistory();