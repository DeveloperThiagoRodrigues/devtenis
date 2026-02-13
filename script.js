const shoes = [
    { id: 1, image: "Assets/01.png" },
    { id: 2, image: "Assets/02.png" },
    { id: 3, image: "Assets/03.png" },
    { id: 4, image: "Assets/04.png" },
];

let currentIndex = 0;

const mainImage = document.querySelector('.shoe-image');
const icons = document.querySelectorAll('.icon');
const navLinks = document.querySelectorAll('nav a');
const arrow = document.querySelector('.more-button');
const showButton = document.querySelector('.button');

// MODAL
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-btn");

// TROCAR IMAGEM
function updateImage(index) {
    currentIndex = index;
    mainImage.src = shoes[index].image;

    icons.forEach(icon => icon.classList.remove('active'));
    document.querySelector(`[data-shoe="${index + 1}"]`).classList.add('active');
}

// CLIQUE NOS ICONES
icons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        updateImage(index);
    });
});

// MENU ATIVO
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        const target = this.textContent.toLowerCase();
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// BOTÃO ARROW (CARROSSEL)
arrow.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= shoes.length) {
        currentIndex = 0;
    }
    updateImage(currentIndex);
});

// BOTÃO MOSTRAR AGORA (ABRIR MODAL)
showButton.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    modalImg.src = mainImage.src;
});

// FECHAR MODAL
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// GALERIA ABRE FULLSCREEN
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

updateImage(0);
