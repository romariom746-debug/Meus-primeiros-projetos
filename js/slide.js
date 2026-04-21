// Aguarda o navegador carregar todo o HTML antes de rodar o script
document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const btnNext = document.querySelector(".carousel-btn.next");
  const btnPrev = document.querySelector(".carousel-btn.prev");
  const indicators = document.querySelectorAll(
    ".carousel-indicators .indicator",
  );

  // Se não encontrar os slides, para a execução para não dar erro
  if (slides.length === 0) {
    console.error(
      "Erro: Nenhum elemento com a classe '.slide' foi encontrado.",
    );
    return;
  }

  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  function showSlide(index) {
    // Garante que o índice esteja dentro do intervalo
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    // Remove classe active de todos os slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Adiciona classe active apenas ao slide atual
    slides[currentSlide].classList.add("active");

    // Atualiza os indicadores
    updateIndicators();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Adiciona os eventos de clique nos botões
  if (btnNext) btnNext.addEventListener("click", nextSlide);
  if (btnPrev) btnPrev.addEventListener("click", prevSlide);

  // Adiciona eventos de clique nos indicadores
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      showSlide(slideIndex);
    });
  });

  // Auto-play a cada 5 segundos
  let autoPlayInterval = setInterval(nextSlide, 5000);

  // Para o auto-play ao passar o mouse e retoma ao sair
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", function () {
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener("mouseleave", function () {
      autoPlayInterval = setInterval(nextSlide, 5000);
    });
  }

  // Mostra o primeiro slide ao carregar
  showSlide(0);
});

// Inicia o primeiro slide
showSlide(currentSlide);
console.log("Carrossel iniciado com sucesso!");
