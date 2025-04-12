const btnSim = document.getElementById('sim');
const btnNao = document.getElementById('nao');
const pergunta = document.getElementById('pergunta');
const botoes = document.getElementById('botoes');
const mensagem = document.getElementById('mensagem');
const mensagemContainer = document.getElementById('mensagem-container');
const canvas = document.getElementById('confeteCanvas');
const ctx = canvas.getContext('2d');

let simClickCount = 0;

btnSim.addEventListener('click', () => {
  simClickCount++;

  if (simClickCount < 3) {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    btnSim.style.position = 'absolute';
    btnSim.style.left = `${x}px`;
    btnSim.style.top = `${y}px`;
  } else {
    esconderTudo();
    mostrarMensagem('<div class="rgb">você é viado</div>');
    setTimeout(() => {
      window.location.href = 'https://www.xvideos.com';
    }, 2000);
  }
});

btnNao.addEventListener('click', () => {
  esconderTudo();
  mostrarMensagem('Vamos jogar Valorant mais tarde galera, hoje o imt vem');
  iniciarConfetes();
});

function esconderTudo() {
  pergunta.style.display = 'none';
  botoes.style.display = 'none';
}

function mostrarMensagem(textoHTML) {
  mensagem.innerHTML = textoHTML;
  mensagemContainer.style.display = 'flex';
}

function iniciarConfetes() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetes = [];

  for (let i = 0; i < 200; i++) {
    confetes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngle: 0,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetes.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
      ctx.stroke();
    });

    update();
    requestAnimationFrame(draw);
  }

  function update() {
    confetes.forEach(c => {
      c.y += Math.cos(c.d) + 3;
      c.tiltAngle += c.tiltAngleIncrement;
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.y = -20;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  draw();
}
