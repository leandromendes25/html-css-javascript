const Modal = {
    open(){
      document.querySelector('.modal-overlay')
      .classList
      .add('active')
    },
    close(){
      document.querySelector('.modal-overlay')
      .classList.remove('active')
    }
  }
  const transacitons = [{
    id: 1,
    description:'Luz',
    amount: - 50000,
    date:'23/01/2021'
  },
  {
    id: 2,
    description: 'Criação de website',
    amount: 500000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'internet',
    amount: - 20000,
    date: '23/01/2021'
  },
]

  const Transaction = {
    all: transactions,//Agrupando os transactions.
    incomes() {
    let income = 0;
    transacitons.all.forEach(transaction => {
      //Se for maior que..
      if (transaction.amount > 0){
        income += transaction.amount;
      }
    })
    return income;
    },
    expenses() {
      let expense = 0;
      //Pegar todas as transações, para cada transação
      transacitons.all.formatCurrencyach(transaction => {
        if(transaction.amount < 0){
          //somar a uma variavel e retornar uma variavel
          expense += transaction.amount;
        }
      })
      return expense; 
    },
    total() {
      return Transaction.incomes() + Transaction.expenses;
    }
  }
  const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction) //está pegando o transaction e está passando para o metodo abaixo
    DOM.transactionContainer.appendChild(tr) //func da DOM, permitindo pegar o #data-table.. dentro da variavel transactionCon...child é o elemento
  },
  /*HTML interno de uma transação */
  innerHTMLTransaction(transaction){
    const CSSclass = transaction.amount > 0 ? "income" : "expense"
    const amount = Utils.formatCurrency(transaction.amount)
      const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover transação" /></td>`
    return html
    },
    //Responsável por deixar bonito na tela
    updateBalance() {
      document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
      document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
      document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
    }
  }
  const Utils = {
    formatCurrency(value) {
      const signal = Number(value) < 0 ? "-" : ""//forçando o valor que está vindo seja do tipo number
      value = String(value).replace(/\D/g,"") //trocamos para String > Acesso a função. /\D/ ache tudo que não é número
      value = Number(value) /100 //coloca os . que precisamos nos números
      value = value.toLocaleString("pt-BR", { //converte a moeda
        style: "currency",
        currency: "BRL"
      }) 
      return signal + value
    }
  }
  transacitons.forEach(function(transaction) {
    DOM.addTransaction(transaction)
  })
  DOM.updateBalance() 

  