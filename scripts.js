const Modal = {
    open(){
        document
        .querySelector(".modal-overlay")
        .classList.add("active")
    },
    close(){
        document
        .querySelector(".modal-overlay")
        .classList.remove("active")
    }
} 

//array de valores
const transactions = [
    {id: 1, description: 'Luz' , amount: -20087 , date: '23/01/2022'},
    {id: 2, description: 'Criação de website' , amount: 500012 , date: '30/01/2022'},
    {id: 3, description: 'Internet' , amount: -20023 , date: '25/01/2022'},
    {id: 4, description: 'App' , amount: 20000 , date: '29/01/2022'}
]

const Transaction = {
    //somar entradas
    incomes(){
        let income = 0;
        transactions.forEach((transaction) => {
            if(transaction.amount > 0){
                income += transaction.amount
            }
        })

        return income;
    },
    //somar saídas
    expenses(){
        let expense = 0;
        transactions.forEach((transaction) => {
            if(transaction.amount < 0){
                expense -= transaction.amount
            }
        })

        return expense;
    },

    //entradas - saídas
    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),
    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        DOM.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction(transaction){

        const cssClass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="">
            </td>
        `

        return html;
    },
    updateBalance(){
        document
        .getElementById("incomeDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.incomes());

        document
        .getElementById("expenseDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.expenses());

        document
        .getElementById("totalDisplay")
        .innerHTML = Utils.formatCurrency(Transaction.total());
    }
}

//Funções importantes
const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "")
        value = Number(value)/100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        } )
        
        return signal + value
    }
}

//carregar os valores
transactions.forEach(transaction => {
    DOM.addTransaction(transaction);
})

DOM.updateBalance();
