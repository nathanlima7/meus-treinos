const formTreino = document.getElementById("form-treino");
const limparDadosBtn = document.getElementById("limpar-dados");

const graficoDistanciaCanvas = document.getElementById("graficoDistancia");
const graficoVelocidadeCanvas = document.getElementById("graficoVelocidade");
const graficoElevacaoCanvas = document.getElementById("graficoElevacao");

let treinos = JSON.parse(localStorage.getItem("treinos")) || [];

function salvarTreinos() {
    localStorage.setItem("treinos", JSON.stringify(treinos));
}

function criarGrafico(canvas, label, data) {
    return new Chart(canvas, {
        type: 'bar',
        data: {
            labels: treinos.map(treino => treino.data),
            datasets: [{
                label,
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let graficoDistancia, graficoVelocidade, graficoElevacao;

function atualizarGraficos() {
    const distancias = treinos.map(treino => treino.distancia);
    const velocidades = treinos.map(treino => treino.velocidade);
    const elevacoes = treinos.map(treino => treino.elevacao);

    if (graficoDistancia) graficoDistancia.destroy();
    if (graficoVelocidade) graficoVelocidade.destroy();
    if (graficoElevacao) graficoElevacao.destroy();

    graficoDistancia = criarGrafico(graficoDistanciaCanvas, 'Distância (km)', distancias);
    graficoVelocidade = criarGrafico(graficoVelocidadeCanvas, 'Velocidade Média (km/h)', velocidades);
    graficoElevacao = criarGrafico(graficoElevacaoCanvas, 'Elevação (m)', elevacoes);
}

formTreino.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;
    const distancia = parseFloat(document.getElementById("distancia").value);
    const velocidade = parseFloat(document.getElementById("velocidade").value);
    const elevacao = parseFloat(document.getElementById("elevacao").value);

    treinos.push({ data, horario, distancia, velocidade, elevacao });
    salvarTreinos();
    atualizarGraficos();
    formTreino.reset();
});

limparDadosBtn.addEventListener("click", () => {
    treinos = [];
    salvarTreinos();
    atualizarGraficos();
});

document.addEventListener("DOMContentLoaded", atualizarGraficos);
