var studentAccountCard = document.getElementById("student-info");
var teacherAccountCard = document.getElementById("teacher-info");
var userInfoCard = document.getElementById("user-info");
var signupBtn = document.getElementById("signupbutton");

document.getElementById("signupnextbtn").addEventListener("click", nextPage);

function nextPage() {
    if(document.getElementById('StudentAccount').checked) {
        userInfoCard.classList.add("hide");
        studentAccountCard.classList.remove("hide");
        signupBtn.classList.remove("hide");
      }else if(document.getElementById('TeacherAccount').checked) {
        userInfoCard.classList.add("hide");
        teacherAccountCard.classList.remove("hide");
        signupbutton.classList.remove("hide");
      }
}