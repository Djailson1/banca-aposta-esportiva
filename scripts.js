let bank = 0;
let historyData = []; // Armazena todos os registros de histórico

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
        const record = { type: "win", amount: profit, stake, odd, description };
        historyData.push(record);
        addToHistory(record);
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
        const record = { type: "loss", amount: -stake, stake, odd: 0, description };
        historyData.push(record);
        addToHistory(record);
        resetFields();
    } else {
        alert("Por favor, insira um valor de aposta válido.");
    }
}

function updateBankDisplay() {
    document.getElementById("current-bank").value = formatCurrency(bank);
}

function addToHistory(record) {
    const historyList = document.getElementById("history");
    const listItem = document.createElement("li");
    listItem.className = record.type;

    listItem.innerHTML = `
        <div class="amount">${formatCurrency(record.amount)}</div>
        <div class="details">
            <span>Odd: ${record.odd > 0 ? record.odd : "-"}</span> | 
            <span>Aposta: ${formatCurrency(record.stake)}</span>
        </div>
        <div class="description">${record.description || "Sem descrição"}</div>
        <div class="actions">
            <button onclick="editHistory(${historyData.length - 1})">Editar</button>
            <button onclick="deleteHistory(${historyData.length - 1})">Deletar</button>
        </div>
    `;

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

// Função para filtrar o histórico
function filterHistory() {
    const search = document.getElementById("search").value.toLowerCase();
    const filterType = document.getElementById("filter-type").value;

    const filteredData = historyData.filter(item => {
        const matchType = filterType ? item.type === filterType : true;
        const matchSearch = item.description.toLowerCase().includes(search) || 
                            item.amount.toString().includes(search) ||
                            item.stake.toString().includes(search) ||
                            item.odd.toString().includes(search);
        return matchType && matchSearch;
    });

    renderHistory(filteredData);
}

function renderHistory(data) {
    const historyList = document.getElementById("history");
    historyList.innerHTML = "";
    data.forEach(record => addToHistory(record));
}

function editHistory(index) {
    // Implemente a função de edição do histórico se necessário
    alert("Função de editar não implementada ainda.");
}

function deleteHistory(index) {
    historyData.splice(index, 1);
    renderHistory(historyData);
}
