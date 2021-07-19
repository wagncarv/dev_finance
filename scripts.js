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

const Transaction = {
    all: [
        {description: 'Luz' , amount: -20087 , date: '23/01/2022'},
        {description: 'Criação de website' , amount: 500012 , date: '30/01/2022'},
        {description: 'Internet' , amount: -20023 , date: '25/01/2022'},
        {description: 'App' , amount: 20000 , date: '29/01/2022'}
    ],
    add(transaction){
        Transaction.all.push(transaction);

        App.reload();
    },

    remove(index){
        Transaction.all.splice(index, 1);
        App.reload();
    },
    //somar entradas
    incomes(){
        let income = 0;
        Transaction.all.forEach((transaction) => {
            if(transaction.amount > 0){
                income += transaction.amount
            }
        })

        return income;
    },
    //somar saídas
    expenses(){
        let expense = 0;
        Transaction.all.forEach((transaction) => {
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
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML = "";
    }
}

//Funções importantes
const Utils = {

    formatDate(date){
        const [ year, month, day ] = date.split(/-/)
        return `${day}/${month}/${year}`;
    },
    formatAmount(value){
        value = Number(value) * 100
        return value;
    },
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

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    formatValues(){
        let { description, amount, date } = Form.getValues();

        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);
        
        return {
            description,
            amount,
            date
        }
    },
    validateFields(){
        const { description, amount, date } = Form.getValues();
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "" ){
             throw new Error("Por favor, preencha todos os campos");
        }
    },
    clearFields(){
        Form.description.value = "";
        Form.amount.value = "";
        Form.date.value = "";
    },
    submit(event){
        event.preventDefault();

        try{
            Form.validateFields();
            const transaction = Form.formatValues();
            Transaction.add(transaction);
            Form.clearFields();
            Modal.close();

        }catch(error){
            alert(error.message);
        }
    }
}

//iniciar
const App = {
    init(){
        //carregar os valores
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        })

        DOM.updateBalance();
        
    },
    reload(){
        DOM.clearTransactions();
        App.init();
    }
}

App.init();



