
document.getElementById("continue").addEventListener("click", function() {
    
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    
    
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
   
    window.location.href = "dashboard.html";
});