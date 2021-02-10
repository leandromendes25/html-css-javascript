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
    incomes() {
    },
    expenses() {

    },
    total() {

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
        <td class="${CSSclass}">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/minus.svg" alt="Remover transação" /></td>`
    return html
    }
  }
  const Utils = {
    formatCurrency(value) {
      const signal = Number(value) < 0 ? "-" : ""//forçando o valor que está vindo seja do tipo number
      value = String(value).replace(/\D/g,"Dis") //trocamos para String > Acesso a função
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