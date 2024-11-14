
function executarSecante() {

    let x0 = parseFloat(document.getElementById("xInicial").value);
    let x1 = parseFloat(document.getElementById("xAtual").value);
    const tol = parseFloat(document.getElementById("tol").value);
    const maxIter = parseInt(document.getElementById("max_iter").value);

    function f(x) {
        return 2 * Math.cos(x) - (Math.exp(x) / 2);
      }

    // Variáveis para o método da secante
    let iteracoes = [];
    let valoresX0 = [];
    let valoresX1 = [];
    let valoresX2 = [];

    for (let i = 0; i < maxIter; i++) {
        const f_x0 = f(x0)
        const f_x1 = f(x1)

        if (f_x1 - f_x0 === 0) {
            break;
        }

        let x2 = x1 - f_x1 * (x1 - x0) / (f_x1 - f_x0)
        let erro = Math.abs(x2 - x1)

        // Armazena os resultados
        iteracoes.push({
            iteracao: i + 1,
            x0: x0,
            x1: x1,
            x2: x2,
            erro: erro
        });

        // Armazena os valores de x0, x1 e x2 para o gráfico
        valoresX0.push(x0);
        valoresX1.push(x1);
        valoresX2.push(x2);

        // Verifica se o critério de parada foi atingido
        if (Math.abs(x2 - x1) < tol) {
            mostrarTabela(iteracoes, x2);
            plotarGrafico(valoresX0, valoresX1, valoresX2);
            return;
        }

        // Atualiza os valores para a próxima iteração
        x0 = x1;
        x1 = x2;
    }

    // Se o loop termina sem atingir a tolerância
    alert("O método não convergiu dentro do número máximo de iterações.");
    mostrarTabela(iteracoes, null);
    plotarGrafico(valoresX0, valoresX1, valoresX2);
}

// Função para exibir a tabela de iterações
function mostrarTabela(iteracoes, raiz) {
    let resultadoHTML = `<table>
        <tr>
            <th>Iteração</th>
            <th>x0</th>
            <th>x1</th>
            <th>x2</th>
            <th>erro</th>
        </tr>`;

    iteracoes.forEach(iter => {
        resultadoHTML += `<tr>
            <td>${iter.iteracao}</td>
            <td>${iter.x0.toFixed(6)}</td>
            <td>${iter.x1.toFixed(6)}</td>
            <td>${iter.x2.toFixed(6)}</td>
            <td>${iter.erro.toFixed(6)}</td>
        </tr>`;
    });

    resultadoHTML += `</table>`;

    if (raiz !== null) {
        resultadoHTML += `<p><strong>Raiz aproximada:</strong> ${raiz.toFixed(6)}</p>`;
    } else {
        resultadoHTML += `<p><strong>Raiz não encontrada dentro do número máximo de iterações.</strong></p>`;
    }

    document.getElementById("resultado").innerHTML = resultadoHTML;
}

// Função para plotar o gráfico usando Chart.js
function plotarGrafico(valoresX0, valoresX1, valoresX2) {
    const ctx = document.getElementById('grafico').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: valoresX0.length }, (_, i) => i + 1),  // Iterações como rótulos
            datasets: [{
                label: 'x0 (aproximações anteriores)',
                data: valoresX0,
                borderColor: 'blue',
                fill: false,
                tension: 0.1
            },
            {
                label: 'x1 (aproximação atual)',
                data: valoresX1,
                borderColor: 'green',
                fill: false,
                tension: 0.1
            },
            {
                label: 'x2 (nova aproximação)',
                data: valoresX2,
                borderColor: 'red',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Iterações'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor de x'
                    }
                }
            }
        }
    });
}

function limpar() {
    const teste = document.getElementById('resultado');
    teste.innerHTML = '';
    document.getElementById("xi_1").value = '';
    document.getElementById("xi").value = '';
    document.getElementById("tol").value = '';
    document.getElementById("max_iter").value = '';
}
