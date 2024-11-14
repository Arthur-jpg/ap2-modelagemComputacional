function f(x) {
    return Math.pow(x, 4) - 9 * Math.pow(x, 3) + x - 3;
}
function calcularBissecao() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const tol = parseFloat(document.getElementById('tolerancia').value);
    const maxIter = parseInt(document.getElementById('maxIter').value);
    
    if (isNaN(a) || isNaN(b) || isNaN(tol) || isNaN(maxIter)) {
        alert("Por favor, insira todos os valores corretamente.");
        return;
    }

    let iteracoes = [];
    let raiz;

    let aCur = a, bCur = b;
    for (let i = 0; i < maxIter; i++) {
        let xi = (aCur + bCur) / 2;
        let fa = f(aCur);
        let fb = f(bCur);
        let fxi = f(xi);
        let toleranciaAtual = Math.abs(aCur - bCur) / 2;

        iteracoes.push({ iteracao: i + 1, a: aCur, b: bCur, xi, fa, fb, fxi, toleranciaAtual });
        
        if (maxIter-1 === i || toleranciaAtual < tol) {
            raiz = xi;
            break;
        }
        if (i === maxIter-1 && raiz == null) {
            raiz = xi;
            break
        }
        
        if (fa * fxi < 0) {
            bCur = xi;
        } else {
            aCur = xi;
        }
    }

    mostrarResultado(iteracoes, raiz);
}

function mostrarResultado(iteracoes, raiz) {
    const tabela = document.getElementById('result-table').querySelector('tbody');
    tabela.innerHTML = ''; 
    
    iteracoes.forEach(({ iteracao, a, b, xi, fa, fb, fxi, toleranciaAtual }) => {
        const linha = `<tr>
            <td>${iteracao}</td>
            <td>${a.toFixed(8)}</td>
            <td>${b.toFixed(8)}</td>
            <td>${xi.toFixed(8)}</td>
            <td>${fa.toFixed(8)}</td>
            <td>${fb.toFixed(8)}</td>
            <td>${fxi.toFixed(8)}</td>
            <td>${toleranciaAtual.toFixed(8)}</td>
        </tr>`;
        tabela.innerHTML += linha;
    });

    document.getElementById('raiz-resultado').textContent = raiz !== undefined 
        ? `A raiz aproximada é: ${raiz.toFixed(8)}` 
        : "A raiz não foi encontrada dentro do número máximo de iterações.";

    // Plotar o gráfico
    const ctx = document.getElementById('grafico').getContext('2d');
    const pontosX = [];
    const pontosY = [];

    // Gera pontos para o gráfico na faixa de [a, b]
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const nPontos = 100; // Número de pontos no gráfico
    const intervalo = (b - a) / nPontos;

    for (let x = a; x <= b; x += intervalo) {
        pontosX.push(x);
        pontosY.push(f(x));
    }

    // Desenha o gráfico usando Chart.js
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: pontosX,
            datasets: [{
                label: 'f(x)',
                data: pontosY,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }, {
                label: 'Raiz aproximada',
                data: [{ x: raiz, y: f(raiz) }],
                pointBackgroundColor: 'red',
                pointRadius: 5,
                showLine: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    });
}


function limpar() {
    const tabela = document.getElementById('result-table').querySelector('tbody');
    const resultado = document.getElementById('raiz-resultado');
    resultado.innerHTML = ''
    tabela.innerHTML = '';
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('tolerancia').value = '';
    document.getElementById('maxIter').value = '';
    document.getElementById('funcao').value = '';
}