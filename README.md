# Smart Expense Splitter

A group expense management application designed for shared spending scenarios such as trips, shared accommodation, or group activities. The application tracks individual contributions, computes real-time balances across all members, and provides settlement suggestions that minimize the number of transactions required to fully resolve outstanding debts.

## Features

- **Group Management** — Create groups and manage member lists
- **Expense Logging** — Record expenses with payer details, amount, description, and split configuration (equal or custom)
- **Contribution Tracking** — View total amount contributed by each member, independent of balance status
- **Real-Time Balance Computation** — Automatically calculates net balance (amount owed or due) for every member, visualized as a balance bar
- **Flexible Settlement** — Supports full or partial payments between any debtor and any creditor, with balances updating dynamically and validated to prevent over-payment
- **Transaction History** — Maintains a chronological log of all recorded expenses and settlements
- *(Planned)* UPI payment integration via deep links/QR codes, backend migration to Node.js, Express, and MongoDB for persistent multi-device storage and multi-user accounts

## Tech Stack

- HTML, CSS, JavaScript
- Browser `localStorage` for data persistence (no backend required in current version)

## System Logic

1. Each expense updates two values: the payer is credited the full amount, while every member included in the split is debited their respective share.
2. Net balances are derived by combining all expense data — a positive balance indicates funds owed *to* the member, a negative balance indicates funds owed *by* the member.
3. Settlement payments are recorded independently and applied against existing balances, allowing for partial repayment across multiple transactions.
4. As balances reach zero, members are automatically considered settled.
5. The system iterates until all member balances reach zero, indicating the group is fully settled.

## Algorithm

**Net Balance Calculation**
```javascript
function calculateBalances(members, expenses, payments) {
    let balance = {};
    members.forEach(m => balance[m] = 0);

    expenses.forEach(exp => {
        let share = exp.amount / exp.splitAmong.length;
        balance[exp.paidBy] += exp.amount;
        exp.splitAmong.forEach(person => balance[person] -= share);
    });

    payments.forEach(pay => {
        balance[pay.from] += pay.amount;
        balance[pay.to] -= pay.amount;
    });

    return balance;
}
```

**Flexible Settlement Validation**
Ensures a payment never exceeds what the payer actually owes or what the receiver is actually due:
```javascript
let maxPossible = Math.min(Math.abs(balance[from]), balance[to]);
if (amount > maxPossible) {
    // reject — invalid payment
}
```

## Usage

1. Create a group and add member names.
2. Log each expense as it occurs, specifying the payer, amount, and split details.
3. Reference the balance dashboard to identify outstanding amounts owed across the group.
4. Record settlements as they occur, specifying the paying member, receiving member, and amount.
5. Continue logging settlements until all balances are resolved.

## Project Structure

```
frontend/
├── html/
│   ├── index.html
│   ├── dashboard.html
│   ├── group.html
│   ├── add-expense.html
│   ├── settle-up.html
│   └── history.html
├── css/
│   └── style.css
└── js/
    ├── calculations.js
    ├── login.js
    ├── dashboard.js
    ├── group.js
    ├── expense.js
    ├── settle.js
    └── history.js
```