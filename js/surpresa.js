document.addEventListener("DOMContentLoaded", () => {
  // Criar corações flutuantes com tamanhos e velocidades variadas
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div")
    heart.className = "coracao-flutuante"

    // Posição aleatória
    heart.style.left = Math.random() * 100 + "vw"

    // Tamanho aleatório
    const size = 10 + Math.random() * 20
    heart.style.width = `${size}px`
    heart.style.height = `${size}px`

    // Velocidade aleatória
    heart.style.animationDuration = 5 + Math.random() * 10 + "s"

    // Atraso aleatório
    heart.style.animationDelay = Math.random() * 5 + "s"

    // Opacidade aleatória
    heart.style.opacity = 0.3 + Math.random() * 0.5

    document.body.appendChild(heart)
  }

  // Adicionar efeito de pulsação na mensagem final
  const mensagemFinal = document.querySelector(".mensagem-final")
  if (mensagemFinal) {
    setInterval(() => {
      mensagemFinal.classList.add("pulse")
      setTimeout(() => {
        mensagemFinal.classList.remove("pulse")
      }, 1000)
    }, 3000)
  }

  // Adicionar data atual
  const dataElement = document.getElementById("data-atual")
  if (dataElement) {
    const hoje = new Date()
    const options = { year: "numeric", month: "long", day: "numeric" }
    dataElement.textContent = hoje.toLocaleDateString("pt-BR", options)
  }

  // Funcionalidade da galeria de fotos
  const fotoItems = document.querySelectorAll(".foto-item")
  const modal = document.getElementById("fotoModal")
  const modalFoto = document.getElementById("modalFoto")
  const modalLegenda = document.getElementById("modalLegenda")
  const modalClose = document.getElementById("modalClose")
  const btnAnterior = document.getElementById("btnAnterior")
  const btnProximo = document.getElementById("btnProximo")

  let currentIndex = 0
  const fotos = []

  // Coletar informações das fotos
  fotoItems.forEach((item, index) => {
    const img = item.querySelector(".foto-galeria")
    const legenda = item.querySelector(".foto-legenda")

    fotos.push({
      src: img.src,
      alt: img.alt,
      legenda: legenda.textContent,
    })

    // Adicionar evento de clique para abrir o modal
    item.addEventListener("click", () => {
      currentIndex = index
      openModal()
    })
  })

  // Função para abrir o modal
  function openModal() {
    if (fotos.length > 0) {
      const foto = fotos[currentIndex]
      modalFoto.src = foto.src
      modalFoto.alt = foto.alt
      modalLegenda.textContent = foto.legenda
      modal.style.display = "block"
      document.body.style.overflow = "hidden" // Prevenir scroll
    }
  }

  // Função para fechar o modal
  function closeModal() {
    modal.style.display = "none"
    document.body.style.overflow = "auto" // Restaurar scroll
  }

  // Função para mostrar foto anterior
  function previousPhoto() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : fotos.length - 1
    const foto = fotos[currentIndex]
    modalFoto.src = foto.src
    modalFoto.alt = foto.alt
    modalLegenda.textContent = foto.legenda
  }

  // Função para mostrar próxima foto
  function nextPhoto() {
    currentIndex = currentIndex < fotos.length - 1 ? currentIndex + 1 : 0
    const foto = fotos[currentIndex]
    modalFoto.src = foto.src
    modalFoto.alt = foto.alt
    modalLegenda.textContent = foto.legenda
  }

  // Event listeners
  modalClose.addEventListener("click", closeModal)
  btnAnterior.addEventListener("click", previousPhoto)
  btnProximo.addEventListener("click", nextPhoto)

  // Fechar modal clicando fora da imagem
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      switch (e.key) {
        case "Escape":
          closeModal()
          break
        case "ArrowLeft":
          previousPhoto()
          break
        case "ArrowRight":
          nextPhoto()
          break
      }
    }
  })

  // Animação de entrada para as fotos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Aplicar animação inicial e observar fotos
  fotoItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(item)
  })
})
