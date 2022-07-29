const signup_btn = document.getElementById("signupForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

signup_btn.addEventListener("submit", (e) => {
  if (document.getElementById("password").value.length < 5) {
    alert("Password length must be at least 5 Charaters Long");
    e.preventDefault();
  }

  if (
    document.getElementById("password").value !==
    document.getElementById("confirm_password").value
  ) {
    e.preventDefault();
  }
});

const check = function () {
  if (
    document.getElementById("password").value ==
    document.getElementById("confirm_password").value
  ) {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerHTML = "matching";
  } else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "not matching";
  }
};
