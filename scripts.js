const Modal = {
  open(){
    //abrir modal
    document.querySelector('.modal-overlay')
    .classList //add class active ao modal
    .add('active')
  },
  close(){
    document.querySelector('.modal-overlay')
    .classList.remove('active')
  }
}
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transaction")) || [] //transforma de String para array. Q vem do set. Ou volte vazio
  },
  set(transactions) {
    localStorage.setItem("dev.finances:transaction",JSON.stringify(transactions))//recebe 2 arg, key & value. Transform String em transactions
  }
}

const Transaction = {
 all: Storage.get(),
//  [
//    {
//   description:'Luz',
//   amount: - 50000,
//   date:'23/01/2021'  
// },
// {
//   description: 'Criação de website',
//   amount: 500000,
//   date: '23/01/2021'
// },
// {
//   description: 'internet',
//   amount: - 20000,
//   date: '23/01/2021'
// },
// ],
  add(transaction){
    Transaction.all.push(transaction)
    App.reload() //ao add vai dar um reload
  },
  remove(index){
    Transaction.all.splice(index, 1)
    App.reload()
  },
  incomes() {
  let income = 0;
  Transaction.all.forEach(transaction => {
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
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0){
        //somar a uma variavel e retornar uma variavel
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index) //está pegando o transaction e está passando para o metodo abaixo
    tr.dataset.index = index

    DOM.transactionContainer.appendChild(tr) //func da DOM, permitindo pegar o #data-table.. dentro da variavel transactionCon...child é o elemento

},
/*HTML interno de uma transação */
innerHTMLTransaction(transaction,index){
  const CSSclass = transaction.amount > 0 ? "income" : "expense"
  const amount = Utils.formatCurrency(transaction.amount)
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação" /></td>`
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
  },
  clearTransaction() {
    DOM.transactionContainer.innerHTML = ""
  }
}
const Utils = {
  formatAmount(value) {//se colocarem uma virgula/ponto vai tirar 
    value = Number(value.replace(/\,\./g, "")) * 100
    return value;
  },
  formatDate(date) {//Format ISO para o nosso
    const splittedDate = date.split("-") 
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`//Organizando e os separando por / no formato de String
  },
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
const Form = {
  description: document.querySelector('input#description'),//Aqui só está pegando o elemtento inteiro
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues(){ //Quando acessar o get, vai estar recebendo um obj > valores
    return {
  description: Form.description.value,
  amount: Form.amount.value,
  date: Form.date.value
}
  },
  formatData(){
    let {description, amount, date} = Form.getValues()//Mudamos de const > let pq os dados vão ser modificados 
    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)
    return {
      description,//não precisamos do : quando o nome da chave é o mesmo da var. As var são o dentro do let
      amount,date//chaves
    }
  },
  validadeField(){
    // const description = Form.getValues().description - podemos fazer desse jeito para os 3 ou desestruturar. Tirar de dentro do obj get,
    //tirando dali de dentro e 
    const {description, amount, date} = Form.getValues()
    if(description.trim() === "" || amount.trim() ===""|| date.trim() === ""){
      throw new Error("Por favor, preencha todos os campos")
    }
  },
  clearFields(){
    Form.description.value = ""
    Form.description.value = ""
    Form.description.value = ""
  },
  submit(event){
    event.preventDefault()//Impedir que faça o padrão e envie toda as informações
    try {
      Form.validadeField()//Verificar se os campos estão validos informações
      const transaction = Form.formatData() //formatar dados para salvar. colocar const transaction pq é uma nova transação formatada.
      Transaction.add(transaction)//salvando
      Form.clearFields()//limpando os campos
      Modal.close()
      
    }
    catch (error) {
      alert(error.message)
    }
    
  
    //salvar, apagar dados > formulario
    //modal feche, atuali app
  }
}


const App = {
  init() {
    //Transaction.all.forEach((transaction, index) => {
      //DOM.addTransaction(transaction, index)
    //}) Por estar só recebendo os mesmos parametros que a função acima
    Transaction.all.forEach(DOM.addTransaction)//passa a ser um atalho
    DOM.updateBalance() 
    Storage.set(Transaction.all)
  },
  reload() {
    DOM.clearTransaction()//pelo App ser exec 2x o clear impede que seja inserido novamente
    App.init()
  },
}
//Depois de descer tudo ele vai dar um reload, do qual chama o init acima novamente
App.init()

