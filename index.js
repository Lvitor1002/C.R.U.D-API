
usuariosDOM()


//Primeira etapa de criação no DOM
async function usuariosDOM(){
    
    //Os dados do usuário vem da API contida em [carregarUsuarios()]
    let [error,listaUsuarios] = await new usuarioRepository().carregarUsuarios()

    if(error){
        exibirMensagemErro(error,"carregar")
        return
    }

    //Se não:
    ocultarMensagemErro()

    
    //Criando o cabeçalho[COLUNAS] da tabelaDOM
    let cabecalhoTabelaDOM = document.getElementById("tabelaUsuarios")

    cabecalhoTabelaDOM.innerHTML = 
    `<tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th id="op">Opção</th>
    </tr>
    `

    
    
    //---------------      Cria a estrututra da linha da tabela para cada usuário   ---------------

    listaUsuarios.forEach((usuario)=>{

        //Criando linha da tabela que irá conter[nome,email,opção] 
        let trDOM = document.createElement("tr")

        //atributo personalizado (data attribute), para obter o [id] de cada usuário da lista
        trDOM.setAttribute("data-idusuario", usuario.id)

        //Criando a célula para o nome
        let td_nomeDOM = document.createElement("td")
        //Define o conteúdo que vai dentro dessa célula[td_nome]. Neste caso: Nome
        td_nomeDOM.textContent = usuario.nome  
        

        //Criando a célula para o email
        let td_emailDOM = document.createElement("td")
        //Define o conteúdo que vai dentro dessa célula[td_email]. Neste caso: Email
        td_emailDOM.textContent = usuario.email 
        

        //Criando a célula para a opcao
        let td_opcaoDOM = document.createElement("td")
        

        //Linha da tabela irá conter[nome,email,opção]
        trDOM.appendChild(td_nomeDOM)
        trDOM.appendChild(td_emailDOM)
        trDOM.appendChild(td_opcaoDOM)


        //Cabeçalho  da tabela adiciona a Linha tr completa para exibir os dados nela contidos
        cabecalhoTabelaDOM.appendChild(trDOM)


        
        //      ---------------      EVENTO DO BOTÃO EDITAR         ---------------
        //Criando um [ícone de edição] para o [botão de editar]
        let iconeEditarDOM = document.createElement("i")
                                  //("class",  "class",   "nome da ação")
        iconeEditarDOM.classList.add("bi", "bi-pencil-fill", "editar")

        //Criando o Button de [editar usuario], e o seu conteúdo será um [ícone de edição]
        let btnEditarDOM = document.createElement("button")
        
        //Botão de edição principal[btnEditarDOM] adiciona o ícone[iconeEditarDOM]
        btnEditarDOM.appendChild(iconeEditarDOM)

        //Celula td[opção] da coluna adiciona os btn de edição e remoção
        td_opcaoDOM.appendChild(btnEditarDOM)
        
        //Ao clicar no botão de editar, ele irá executar os algoritmos seguintes:
        btnEditarDOM.addEventListener("click", function(evento){



            //Obtendo todas as linhas para que as mesmas fiquem com borda ao ser selecionadas
            let linhas_trDOM = document.querySelectorAll(".tabelaUsuarios tr")

            //Percorrendo as linhas
            linhas_trDOM.forEach(function(linha){

                //Remove a borda tracejada[verde] padrão para cada linha do DOM
                linha.classList.remove("editandoCliente")
            })
            //Obtém somente o btn clicado
            let btnDOMSelecionado = evento.target

            // Sobe na hierarquia do DOM para relacionar os [Selecionados]. VERIFIQUEI ISSO NOS ELEMENTOS/div's DO CONSOLE.
            let linhaDOMSelecionado = btnDOMSelecionado.parentElement.parentElement.parentElement

            //Adiciona a borda tracejada[verde] para a linha Seleciona
            linhaDOMSelecionado.classList.add("editandoCliente")




            //Obtém o valor do nome Selecionado
            let nome = usuario.nome
            
            //Obtém o valor do email Selecionado
            let email = usuario.email

            //Obtendo o ID do Selecionado pelo (data-idusuario)
            document.getElementById("idusuario").value = usuario.id

            //Ao clicar no atualizar, preenche automaticamente os input com o [nome atual] para atualização
            document.getElementById("nome").value = nome
            
            //Ao clicar no atualizar, preenche automaticamente os input com o [email atual] para atualização
            document.getElementById("email").value = email
            




            //Obtendo o botão de confirmação da ação
            let btnConfirma = document.getElementById("confirmaUsuario")

            //Limpa o conteúdo atual do botão (inclusive o ícone antigo)
            btnConfirma.innerHTML = ""

            // Cria um ícone de atualizar que será adicionado pelo [btnConfirma]
            let iconeAtualizaDOM = document.createElement("i")
                                      //("class",       "class",            "nome da ação")
            iconeAtualizaDOM.classList.add("bi", "bi-arrow-counterclockwise", "atualizar") 

            // Adiciona o ícone[iconeAtualizaDOM] ao botão[btnConfirma] de confirmação da ação
            btnConfirma.appendChild(iconeAtualizaDOM)

        })

    



        //      ---------------      EVENTO DO BOTÃO REMOVER         ---------------
        //Criando um [ícone de remoção] para o [botão de editar]
        let iconeRemoverDOM = document.createElement("i")
                                  //("class",  "class",   "nome da ação")
        iconeRemoverDOM.classList.add("bi", "bi-trash-fill","remover")

        
        //Criando o Button de [remover usuario], e o seu conteúdo será um [ícone de remover]
        let btnRemoverDOM = document.createElement("button")
        
        //Botão de remover principal[btnRemoverDOM] adiciona o ícone[iconeRemoverDOM]
        btnRemoverDOM.appendChild(iconeRemoverDOM)
        
        //Celula td[opção] da coluna adiciona os btn de edição e remoção
        td_opcaoDOM.appendChild(btnRemoverDOM)

        //Ao clicar no botão de remover, ele irá executar os algoritmos seguintes:
        btnRemoverDOM.addEventListener("click", async function(evento){

            let [error,usuarioRemover] = await new usuarioRepository().removerUsuarios(usuario.id)

            if(error){
                exibirMensagemErro(error,"remover")
                return 
            }
            //Se não, então:
            ocultarMensagemErro()


            //Ao clicar no remover, preenche automaticamente o input com um 'vazio' no [nome atual] para remover
            document.getElementById("nome").value = ""
            
            //Ao clicar no remover, preenche automaticamente o input com um 'vazio' no [email atual] para remover
            document.getElementById("email").value = ""
            
            //Ao clicar no remover, preenche automaticamente o input com um 'vazio' no [id atual/oculto] para remover
            document.getElementById("idusuario").value = ""

            
            // remove a linha da tabela
            let linhasDOMSelecionado = evento.target.closest("tr");

            if (linhasDOMSelecionado) {
                linhasDOMSelecionado.remove();
            }

        })

    })

    ocultarMensagemErro()
    
}



//     ---------------      EVENTO AO ENVIAR FORMULÁRIO         ---------------

let formulario = document.getElementById("formularioCadastroUsuario")

formulario.addEventListener("submit", async function(evento){


    //Previnir comportamentos indesejados de recarregar a página
    evento.preventDefault()

    //Obtendo o valor do nome do input pelo Name do HTML
    let nome = formulario.elements["nome"].value.trim().toLowerCase()

    //Obtendo o valor do email do input pelo Name do HTML
    let email = formulario.elements["email"].value.trim().toLowerCase()

    //Obtendo o valor do ID do input/oculto pelo (data-idusuario)
    let idusuario = formulario.elements["idusuario"].value



    //Validações e tratamentos
    
    // NOME
    if(nome.trim() === '' || !/^[A-Za-z\s]+$/.test(nome)){
        alert(">Verifique o campo 'Nome'.\n>Preenchimento necessário ou caracteres inválidos.")
        return
    }
    
    if(nome.length > 30){
        alert(">Verifique o campo 'Nome'.\n>Número de caracteres ultrapassou o limite de 20.")
        return
    }

    // EMAIL
    if(email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert(">Verifique o campo 'Email'.\n>Preenchimento necessário ou caracteres inválidos.")
        return
    }
    if(email.length > 30){
        alert(">Verifique o campo 'Email'.\n>Número de caracteres ultrapassou o limite de 20.")
        return
    }
    
    
    nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase()


    //Verifica pelo [idusuario] se formulário já está preenchido e enviado corretamente
    if(idusuario == ""){


        //   ---------------      CHAMADA PARA CRIAR USUÁRIOS      ---------------

        let [error,usuarioCriar] = await new usuarioRepository().criarUsuarios(nome, email)

        if(error){
            exibirMensagemErro(error,"criar")
            return 
        }
        //Se não, então:
        ocultarMensagemErro()

        //Apagando campo
        evento.target.reset()

        //chamando o carregar usuários, para atualiza-los
        usuariosDOM() 



    }
    else    //Se não for vazio, então siginifica que já existe um [idusuario]
    {  


        
        //Considerando este [id] já existente, realize então o [Update/atualiza] para o mesmo


        //   ---------------      CHAMADA PARA ATUALIZAR USUÁRIOS      ---------------
        
        let [error,usuarioAtualizar] = await new usuarioRepository().atualizarUsuarios(nome, email, idusuario)

        if(error){
            exibirMensagemErro(error,"atualizar")
            return 
        }
        //Se não, então:
        ocultarMensagemErro()


        //Obtendo novamente o botão de confirmação da ação
        let btnConfirma = document.getElementById("confirmaUsuario")

        //Troca o conteúdo atual do botão[iconeAtualizaDOM] e torna ao icone padrão de [confirmação]
        btnConfirma.innerHTML = 
        `
            <i class="bi bi-plus-circle-fill">
            </i>
        `

        evento.target.reset()

        formulario.elements["idusuario"].value = ""


        //chamando o carregar usuários, para atualiza-los
        usuariosDOM() 
    }

})




//   ---------------      FUNÇÕES PARA ERROS        ---------------

function exibirMensagemErro(msg,error){

    let msgErro = document.getElementById("mensagensDeErro")

    //Conteúdo desta mensagem será:
    msgErro.textContent = `Erro inesperado ao ${error}  o usuário | ${msg}`
    msgErro.classList.add("mensagensDeErroExibir")
}



function ocultarMensagemErro(){

    let msgErro = document.getElementById("mensagensDeErro")

    //Conteúdo desta mensagem será:
    msgErro.textContent = ""
    msgErro.classList.remove("mensagensDeErroExibir")
}


