
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

const AtribuiValor = () =>{
    document.getElementById("nome").value = localStorage.getItem("chave0")

    document.getElementById("email").value= localStorage.getItem("chave1")

    document.getElementById("cep").value = localStorage.getItem("chave2")

    document.getElementById("endereco").value = localStorage.getItem("chave3")

    document.getElementById("numero").value= localStorage.getItem("chave4")

    document.getElementById("bairro").value= localStorage.getItem("chave5")

    document.getElementById("cidade").value = localStorage.getItem("chave6")

    document.getElementById("estado").value= localStorage.getItem("chave7")
    
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
 {
 limparCampos();
 document.getElementById("nome").value = "";
 document.getElementById("email").value = "";
 document.getElementById("cep").value = "";
 document.getElementById("numero").value = "";
 document.getElementById("btn2").style.display="flex";}
})


document.getElementById("cep").addEventListener("focusout",buscaCep);
document.getElementById("btn2").addEventListener("click",AtribuiValor)