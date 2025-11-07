const user = localStorage.getItem("currentUser");
const authArea = document.getElementById("authArea");

if (user) {
  authArea.innerHTML = `👤 ${user}`;
  authArea.style.cursor = "pointer";

  authArea.addEventListener("click", () => {
    window.location.href = "profile.html"; 
  });

} else {
  authArea.innerHTML = "Login / Register";
  authArea.style.cursor = "pointer";

  authArea.addEventListener("click", () => {
    window.location.href = "login.html"; 
  });
}

$(document).ready(function () {
    $(".about-card p, .about-card ul li").each(function (index) {
        $(this)
            .css({ opacity: 0 })
            .delay(150 * index)
            .animate({ opacity: 1 }, 600);
    });


    const team = [
        { name: "Daniyal Adilbekov", role: "Frontend Developer", img: "material/creator1.jpg" },
        { name: "Rassul Sakenov", role: "Backend Developer", img: "material/creator2.jpg" },
        { name: "Satbek Abyz", role: "Game Logic Developer", img: "material/creator3.jpg" },
        { name: "Aitkali Shilten", role: "Backend Developer", img: "material/creator4.jfif" },
        { name: "Yerassyl Aryn", role: "UI/UX Designer", img: "material/creator5.jpg" }
    ];
    team.forEach((member, i) => {
        $("#team-cards").append(`
            <div class="team-card fade-in" style="animation-delay: ${i * 0.15}s">
                <div class="avatar-wrapper">
                    <img src="${member.img}" alt="${member.name}">
                </div>
                <h4>${member.name}</h4>
                <p>${member.role}</p>
            </div>
        `);
    });
});
