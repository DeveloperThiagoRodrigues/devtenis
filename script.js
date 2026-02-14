const shoes = [
    { id: 1, image: "Assets/01.png" },
    { id: 2, image: "Assets/02.png" },
    { id: 3, image: "Assets/03.png" },
    { id: 4, image: "Assets/04.png" },
];

let currentIndex = 0;

const mainImage = document.getElementById('mainShoe');
const icons = document.querySelectorAll('.icon');
const navLinks = document.querySelectorAll('nav a');
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-btn");

// Atualiza imagem principal
function updateImage(index) {
    currentIndex = index;
    mainImage.src = shoes[index].image;
    mainImage.style.opacity = 0;
    setTimeout(() => {
        mainImage.style.opacity = 1;
    }, 200);

    icons.forEach(i => i.classList.remove('active'));
    document.querySelector(`[data-shoe="${index + 1}"]`).classList.add('active');
}

// Clique nos ícones
icons.forEach((icon, idx) => {
    icon.addEventListener('click', () => updateImage(idx));
});

// Navegação suave + active
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Carrossel com seta (opcional, se quiser manter)
document.querySelector('.scroll-hint i')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % shoes.length;
    updateImage(currentIndex);
});

// Modal para galeria e botão comprar
document.querySelectorAll('.gallery-img, .neon-btn').forEach(el => {
    el.addEventListener('click', e => {
        if (el.classList.contains('neon-btn')) e.preventDefault();
        modal.style.display = "flex";
        modalImg.src = mainImage.src; // ou img.src se for galeria
    });
});

closeBtn.addEventListener('click', () => modal.style.display = "none");
modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = "none"; });

// Partículas neon
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    p.style.width = p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDelay = Math.random() * 15 + 's';
    p.style.animationDuration = (15 + Math.random() * 25) + 's';
    particlesContainer.appendChild(p);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 100);
});

updateImage(0);