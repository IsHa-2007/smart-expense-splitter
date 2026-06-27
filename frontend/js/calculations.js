function calculateTotalSpent(members, expenses) {
    let totalSpent = {};
    members.forEach(m => totalSpent[m] = 0);

    expenses.forEach(exp => {
        totalSpent[exp.paidBy] += exp.amount;
    });

    return totalSpent;
}


function calculateBalances(members, expenses, payments) {
    let balance = {};
    members.forEach(m => balance[m] = 0);

    
    expenses.forEach(exp => {
        let splitCount = exp.splitAmong.length;
        let share = exp.amount / splitCount;
        balance[exp.paidBy] += exp.amount;
        exp.splitAmong.forEach(person => {
            balance[person] -= share;
        });
    });

    
    payments.forEach(pay => {
        balance[pay.from] += pay.amount;
        balance[pay.to] -= pay.amount;
    });

    return balance;
}