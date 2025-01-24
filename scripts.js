let bank = 0;

// Atualiza a banca inicial
document.getElementById("bank").addEventListener("input", function () {
    bank = parseFloat(this.value) || 0;
    updateBankDisplay();
});

function addWin() {
    const stake = parseFloat(document.getElementById("stake").value) || 0;
    const odd = parseFloat(document.getElementById("odd").value) || 0;
    const description = document.getElementById("description").value.trim();

    if (stake > 0 && odd > 0) {
        const profit = stake * odd - stake;
        bank += profit;
        updateBankDisplay();
        addToHistory("Vitória", `R$ ${formatCurrency(profit)}`, "win", description, odd, stake);
        resetFields();
    } else {
        alert("Por favor, insira valores válidos.");
    }
}

function addLoss() {
    const stake = parseFloat(document.getElementById("stake").value) || 0;
    const description = document.getElementById("description").value.trim();

    if (stake > 0) {
        bank -= stake;
        updateBankDisplay();
        addToHistory("Derrota", `R$ ${formatCurrency(stake)}`, "loss", description, 0, stake);
        resetFields();
    } else {
        alert("Por favor, insira um valor de aposta válido.");
    }
}

function updateBankDisplay() {
    document.getElementById("current-bank").value = formatCurrency(bank);
}

function addToHistory(type, amount, className, description, odd, stake) {
    const historyList = document.getElementById("history");
    const listItem = document.createElement("li");
    listItem.className = className;

    let historyText = `${type}: ${amount}`;

    if (description) {
        historyText += ` | Descrição: ${description}`;
    }

    historyText += ` | Odd: ${odd} | Valor Apostado: R$ ${formatCurrency(stake)}`;

    listItem.textContent = historyText;
    historyList.appendChild(listItem);
}

function resetFields() {
    document.getElementById("stake").value = "";
    document.getElementById("odd").value = "";
    document.getElementById("description").value = "";
}

// Função para formatar números em moeda com vírgula
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').replace('.', ',');
}

// Filtro de Pesquisa
function filterHistory() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const historyItems = document.querySelectorAll("#history li");

    historyItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

// Filtro por Resultado (Vitória/Derrota)
function filterByResult() {
    const resultFilter = document.getElementById("result-filter").value;
    const historyItems = document.querySelectorAll("#history li");

    historyItems.forEach(item => {
        if (resultFilter === "" || item.classList.contains(resultFilter)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}
