
document.querySelector("#btn-enviar").addEventListener("click",
    () => {
        let email=document.querySelector("#email").value
        let senha=document.querySelector("#senha").value
        let db=JSON.parse(localStorage.getItem("usuarios") )
        if(email ==="" || senha ==="")
        {
            alert("Informe o email e senha")
            let main=document.querySelector("main")
            main.setAttribute("class", "failed")
        }else{
            
            let userDb=db.findIndex(user=>user.email === email && user.senha === senha)
            if(userDb>=0){
            
                const logado = {
                    id:db[userDb].id,
                    recado:db[userDb].recado
                }
                localStorage.setItem("userDb", JSON.stringify(logado)) 
                let main=document.querySelector("main")
                main.setAttribute("class", "sucess")
                setTimeout(() => {window.location.href="recados.html"}, 3000);
                
                 
            }
            
            
        }}
    );

