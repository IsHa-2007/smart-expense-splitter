let savedName = localStorage.getItem("username");
document.getElementById("userName").textContent = savedName;

function displayGroups() {
    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    let groupsListDiv = document.getElementById("groupsList");
    let emptyState = document.getElementById("emptyState");

    groupsListDiv.innerHTML = "";

    if (groups.length === 0) {
        emptyState.style.display = "block";
        return;
    }
    emptyState.style.display = "none";

    groups.forEach(function(groupName) {
        let groupCard = document.createElement("div");
        groupCard.className = "group-card";
        groupCard.textContent = groupName;

       
        groupCard.addEventListener("click", function() {
            localStorage.setItem("currentGroup", groupName);
            window.location.href = "group.html";
        });

        groupsListDiv.appendChild(groupCard);
    });
}

document.getElementById("createGroupBtn").addEventListener("click", function() {
    document.getElementById("groupModal").style.display = "flex";
});

document.getElementById("cancelGroupBtn").addEventListener("click", function() {
    document.getElementById("groupModal").style.display = "none";
});

document.getElementById("confirmGroupBtn").addEventListener("click", function() {
    let groupName = document.getElementById("newGroupName").value;
    let membersInput = document.getElementById("newGroupMembers").value;

    if (!groupName || !membersInput) {
        alert("Please fill both fields.");
        return;
    }

    let members = membersInput.split(",").map(name => name.trim());

    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    groups.push(groupName);
    localStorage.setItem("groups", JSON.stringify(groups));

    let groupData = { members: members, expenses: [], payments: [] };
    localStorage.setItem("group_" + groupName, JSON.stringify(groupData));

    document.getElementById("groupModal").style.display = "none";
    document.getElementById("newGroupName").value = "";
    document.getElementById("newGroupMembers").value = "";

    displayGroups();
});