
const preencherCampos = (endereco) =>{
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
}

const limparCampos = () =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const ValidandoCep = (cep) => cep.length == 8 && eNumero(cep); 
 
const buscaCep = async() =>{
    limparCampos();
    const cep = document.getElementById("cep").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if(ValidandoCep(cep)){
      const dados = await fetch(url)
      const endereco = await dados.json();
      if(endereco.hasOwnProperty("erro")){
        document.getElementById('endereco').value = 'CEP não encontrado!';
      }
      else{
      preencherCampos(endereco);
      }
    }
    else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
}

const SalvarDados = (nome,email,cep,end,num,ba,cid,es) =>{

    const Dados = [nome,email,cep,end,num,ba,cid,es];

    for(let i = 0; i < Dados.length; i++){
      localStorage.setItem(`chave${i}`,Dados[i]);
    }

}

document.getElementById("btn").addEventListener("click",()=>{
 SalvarDados(
    document.getElementById("nome").value,
    document.getElementById("email").value,
    document.getElementById("cep").value,
    document.getElementById("endereco").value,
    document.getElementById("numero").value,
    document.getElementById("bairro").value,
    document.getElementById("cidade").value,
    document.getElementById("estado").value,

    
 )
})


document.getElementById("cep").addEventListener("focusout",buscaCep);