class Cliente {
    constructor() {
        this.clientes = localStorage.getItem('tbClientes') === null
        ? []
        : JSON.parse(localStorage.getItem('tbClientes'))
    }

    salva(cliente) {
        //registro esta sendo editado?
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(cliente.codigo)
        }

        this.clientes.push(cliente) //adiciona um novo elemento ao array(matriz)
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso')
    }

    apaga(codigo) {
        let index = this.clientes.findIndex(cliente => cliente.codigo == codigo)
        this.clientes.splice(index, 1)

        localStorage.setItem('tbCliente', JSON.stringify(this.clientes))
        cliente.atualiza()
    }

    edita(cliente) {
        document.getElementById('codigo').setAttribute('disabled', 'disabled')
        document.getElementById('codigo').value = cliente.codigo
        document.getElementById('nome').value = cliente.nome
        document.getElementById('cep').value = cliente.cep
        document.getElementById('endereco').value = cliente.endereco
        document.getElementById('bairro').value = cliente.bairro
        document.getElementById('cidade').value = cliente.cidade
        document.getElementById('observacoes').value = cliente.observacoes
        document.getElementById('limite').value = cliente.limite
        document.getElementById('utilizado').value= cliente.utilizado
        document.getElementById('saldo').value = cliente.saldo
    }

    lista() {
        const listagem = this.clientes.map((cliente) => (
            `<tr>
            <td>${cliente.codigo}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cep}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.bairro}</td>
            <td>${cliente.cidade}</td>
            <td>${cliente.observacoes}</td>
            <td>${cliente.saldo}</td>
            <td>
                <button id='apagar' onClick='cliente.apaga(${cliente.codigo})'>🗑️ Apagar</button>
                <button id='editar' onClick='cliente.edita(${JSON.stringify(cliente)})'>✏️ Editar</button>
            </td>
            </tr>
            `
        ))
        return (`<table border='1' class='paleBlueRows'>
        <caption>Relação dos clientes </caption>
        <thead>
            <th>Código</th>
            <th>Nome</th>
            <th>CEP</th>
            <th>Endereço</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Observações</th>
            <th>Saldo</th>
            <th>Opções</th>
            </thead>
            <tbody>${listagem}</tbody>
            </table>
        `)
    }
    atualiza() {
        document.getElementById('listagem').innerHTML = cliente.lista()
    }
}
//Instanciamos um novo objeto
const cliente = new Cliente()
//tratando botão salvar
document.getElementById('salvar').onclick = function () {
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        observacoes: document.getElementById('observacoes').value,
        limite: document.getElementById('limite').value ,
        utilizado: document.getElementById('utilizado').value,
        saldo: document.getElementById('saldo').value
    }
    cliente.salva(registro)
}
window.onload = function() {
    cliente.atualiza()
}
//tratamos a alteração do campo "utilizado"
document.getElementById('utilizado').onchange = function () {
    let limite = document.getElementById('limite').value
    let utilizado = document.getElementById('utilizado').value
    let saldo = limite - utilizado
    document.getElementById('saldo').value = saldo.toFixed(2)
}