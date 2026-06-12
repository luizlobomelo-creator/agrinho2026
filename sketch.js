let lixos = [];
let pontuacao = 0;
let tempo = 0;

function setup() {
  createCanvas(800, 500);

  // cria lixo inicial no rio
  for (let i = 0; i < 8; i++) {
    lixos.push(new Lixo(random(width), random(150, 450)));
  }
}

function draw() {
  background(100, 180, 255);

  desenhaRio();

  // spawn de lixo ao longo do tempo
  tempo++;
  if (tempo % 60 === 0) {
    lixos.push(new Lixo(random(width), random(150, 450)));
  }

  // atualiza e mostra lixo
  for (let i = lixos.length - 1; i >= 0; i--) {
    lixos[i].update();
    lixos[i].show();

    if (lixos[i].removido) {
      lixos.splice(i, 1);
      pontuacao += 5;
    }
  }

  // placar
  fill(0);
  textSize(18);
  text("Pontuação: " + pontuacao, 10, 20);

  textSize(14);
  text("Clique no lixo para limpar o rio 🌊♻️", 10, 45);

  // efeito de poluição
  if (lixos.length > 15) {
    fill(0, 100);
    rect(0, 0, width, height);
    fill(255);
    textSize(24);
    text("RIO POLUÍDO! 😢", width / 2 - 80, height / 2);
  }
}

function desenhaRio() {
  // margem verde
  fill(60, 200, 120);
  rect(0, 0, width, 100);
  rect(0, 450, width, 50);

  // água
  fill(30, 144, 255);
  rect(0, 100, width, 350);
}

function mousePressed() {
  for (let lixo of lixos) {
    lixo.checkClick(mouseX, mouseY);
  }
}

// ---------------- CLASSE ----------------

class Lixo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25;
    this.removido = false;
  }

  update() {
    // leve movimento simulando correnteza
    this.x += random(-1, 1);
    this.y += random(-0.5, 0.5);
  }

  show() {
    fill(120);
    rect(this.x, this.y, this.size, this.size);

    fill(0);
    textSize(10);
    text("LIXO", this.x + 2, this.y + 15);
  }

  checkClick(px, py) {
    if (
      px > this.x &&
      px < this.x + this.size &&
      py > this.y &&
      py < this.y + this.size
    ) {
      this.removido = true;
    }
  }
}