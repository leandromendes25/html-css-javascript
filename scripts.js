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
  const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount > 0 ) {
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if( transaction.amount < 0 ) {
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();
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
  // transacitons.forEach(function(transaction) {
  //   DOM.addTransaction(transaction)
  // })Como o metodo DOM. está recebendo os mesmos parametros que a função
  // e não está acontecendo mais nada,podemos transformar na de baixo

App.init()