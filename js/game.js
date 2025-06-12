const grid = document.getElementById("grid")
const feedback = document.getElementById("feedback")

const size = 5
const total = size * size
const heartIndex = Math.floor(Math.random() * total)

// Mensagens mais românticas e fofas
const mensagens = [
  { text: "Hmm... my heart isn't here...", anim: "shake", icon: "❄️" },
  { text: "You're getting warmer...", anim: "pulse", icon: "✨" },
  { text: "So close to my heart...", anim: "shake", icon: "💫" },
  { text: "Keep looking...", anim: "pulse", icon: "🔍" },
]

// Contador para acompanhar quantos quadrados foram clicados
let clickedCount = 0
const clickedCells = new Set()

// Criar o grid
for (let i = 0; i < total; i++) {
  const cell = document.createElement("div")
  cell.dataset.index = i
  cell.addEventListener("click", () => handleClick(i, cell))
  grid.appendChild(cell)
}

function handleClick(index, cell) {
  // Se a célula já foi clicada, não fazer nada
  if (clickedCells.has(index)) {
    return
  }

  if (index == heartIndex) {
    // Encontrou o coração!
    cell.innerHTML = `<svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path></svg>`
    cell.style.color = "#ff4081"
    cell.classList.add("zoom")

    feedback.innerHTML = `<span style="color:#ff4081">You found my heart!</span>`

    setTimeout(() => {
      window.location.href = "surpresa.html"
    }, 1000)
  } else {
    // Não encontrou o coração
    clickedCells.add(index)
    clickedCount++

    // Marcar como clicado
    cell.classList.add("clicked")

    // Escolher uma mensagem baseada em quão perto está do coração
    const distanceX = Math.abs(Math.floor(index / size) - Math.floor(heartIndex / size))
    const distanceY = Math.abs((index % size) - (heartIndex % size))
    const distance = distanceX + distanceY

    let messageIndex
    if (distance <= 1) {
      messageIndex = 2 // Muito perto
    } else if (distance <= 3) {
      messageIndex = 1 // Médio
    } else {
      messageIndex = 0 // Longe
    }

    const { text, anim } = mensagens[messageIndex]
    feedback.textContent = text

    cell.classList.add(anim)
    setTimeout(() => cell.classList.remove(anim), 600)

    // Se já clicou em quase todos os quadrados, dar uma dica
    if (clickedCount >= total - 5 && !feedback.textContent.includes("dica")) {
      feedback.textContent = "Hint: Follow your heart, it's so close!"
    }
  }
}

// Inicializar com uma mensagem fofa
window.addEventListener("DOMContentLoaded", () => {
  feedback.textContent = "Find where I hid my heart for you..."
})
