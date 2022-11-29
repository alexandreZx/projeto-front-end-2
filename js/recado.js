const userDb=localStorage.getItem("userDb")


if(!userDb){
    location.href="index.html"
}
document.querySelector("#btn-logout").addEventListener("click", ()=>{
    localStorage.removeItem("userDb")
    location.href="index.html"
})

let botaoSalvar=document.querySelector("#btn-salvar")
botaoSalvar.addEventListener("click", criarMensagem)

function criarMensagem(){
    let recados=JSON.parse(localStorage.getItem("recados")||"[]")
    let det=document.querySelector("#det").value
    let des=document.querySelector("#des").value
    if(det=="" || des==""){
        alert("Preencha os campos vazios!!!")
    }else{
        const mensagem={
            id:S4()+S4(),
            descricao:des,
            detalhamento:det,
            userId:userDb
        }
        recados.push(mensagem)
        localStorage.setItem("recados",JSON.stringify(recados))
        imprimirMensagem()
    }     
}



function imprimirMensagem(){
    let recados=JSON.parse(localStorage.getItem("recados"))
    if(!recados.length){
        document.querySelector("#semRecados").style.display="block"
        document.querySelector("#tabela").style.display="none"
    }else{
        document.querySelector("#semRecados").style.display="none"
        document.querySelector("#tabela").style.display="block"
        let tbody=document.querySelector("#tbody")
    tbody.innerHTML=""
    const findRecados=recados.filter((recado)=>recado.userId===userDb)
    for (const key in findRecados) {
        tbody.innerHTML+=`
      <tr id="${findRecados[key].id}">
      <td>${Number(key)+1}</td>
      <td>${findRecados[key].descricao}</td>
      <td>${findRecados[key].detalhamento}</td>
      <td>
          <button type="button" id="btn-editar" onclick="editarMensagem('${findRecados[key].id}')">Editar</button>
          <button type="button" id="btn-apagar" onclick="apagarMensagem('${findRecados[key].id}')">Apagar</button>
      </td>
      </tr>
      `
    }
    }
    
}

function editarMensagem(id){
    let recado=JSON.parse(localStorage.getItem("recados"))
    let editarMsg=recado.findIndex(recado=>recado.id==id)
    if(editarMsg>=0){
        recado[editarMsg].descricao=prompt("Digite a descrição")
        recado[editarMsg].detalhamento=prompt("Digite o detalhamento")
        recado.splice(editarMsg,1,recado[editarMsg])
        localStorage.setItem("recados", JSON.stringify(recado))
        imprimirMensagem()
    }
  
    
    };
    

    

function apagarMensagem(id){
    let recados=JSON.parse(localStorage.getItem("recados"))
    
    if(window.confirm("Deseja apagar essa mensagem?")){
        
        const removeMensagem=recados.filter(recado=>recado.id!==id)
        localStorage.setItem("recados",JSON.stringify(removeMensagem))
        imprimirMensagem()
    }
}
function S4() {
    const time = new Date().getTime();
    return Math.floor((1 + Math.random()) * time)
        .toString(16)
        .substring(1);
}

imprimirMensagem()