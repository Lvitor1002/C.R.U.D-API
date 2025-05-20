import { ApiRepository } from './ApiRepository.js'

const formulario = document.getElementById("idFormularioCadastroUsuario")
const campoTabela = document.getElementById("idTabelaUsuarios")

const nomeInput = document.getElementById("idNome")
const emailInput = document.getElementById("idEmail")

const btnConfirmaUsuario = document.getElementById("idConfirmaUsuario")
const idLoading = document.getElementById("idLoading")

const pesquisarInput = document.getElementById("idPesquisar")

carregarUsuarios()

let listaUsuariosCache = [];

async function carregarUsuarios() {

    listaUsuariosCache = await new ApiRepository().carregarUsuarios()
    renderizarTabela()
}

formulario.addEventListener("submit", async function(evento){

    evento.preventDefault()

    let nome = nomeInput.value.trim()
    let email = emailInput.value.trim()
    let idUsuario = formulario["idUsuario"].value

    if(nome === "" || !/^[A-Za-z\s]/.test(nome) || nome.length > 50){
        Swal.fire({
            icon: "error",
            title: "Entrada inválida para nome!",
            text: `Verifique se o campo nome foi preenchido corretamente..`,
        });
        return 
    }

    if(email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 30){
        Swal.fire({
            icon: "error",
            title: "Entrada inválida para email!",
            text: `Verifique se o campo email foi preenchido corretamente..`,
        });
        return 
    }

    nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase()


    //Verifica se o [idusuario] existe 
    if(idUsuario == ""){

        await new ApiRepository().criarUsuario(nome,email)
        
        //Apagando campo
        evento.target.reset()


    }else{
        await new ApiRepository().atualizarUsuario(nome,email,idUsuario)
        
        // linha para limpar o ID após a atualização
        formulario["idUsuario"].value = ""

        evento.target.reset()
        
        btnConfirmaUsuario.classList.replace("bi-pen-fill", "bi-plus-circle-fill")
        idLoading.classList.add("ocultar")
    }
    
    await carregarUsuarios()

})


async function renderizarTabela(usuarios){

    campoTabela.innerHTML = ''; 

    const listaParaRenderizar = usuarios || listaUsuariosCache
    
    listaParaRenderizar.forEach((usuario) => {
        
        
        const trLinha = document.createElement("tr")
        const tdNome = document.createElement("td")
        const tdEmail = document.createElement("td")
        const tdOpcao = document.createElement("td")
        tdOpcao.classList.add("campoOp")

        const btnEditar = document.createElement("button")
        btnEditar.classList.add("editar","bi","bi-pen-fill")

        const btnRemover = document.createElement("button")
        btnRemover.classList.add("remover","bi","bi-person-x-fill")

        tdOpcao.appendChild(btnEditar)
        tdOpcao.appendChild(btnRemover)

        trLinha.appendChild(tdNome)
        trLinha.appendChild(tdEmail)
        trLinha.appendChild(tdOpcao)

        campoTabela.appendChild(trLinha)

        
        tdNome.textContent = usuario.nome
        tdEmail.textContent = usuario.email

        btnRemover.addEventListener("click",async function(evento){
           
            btnConfirmaUsuario.classList.replace("bi-pen-fill", "bi-plus-circle-fill")
            idLoading.classList.add("ocultar")

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            
            const resultado = await swalWithBootstrapButtons.fire({
                title: `Deseja apagar usuário [${usuario.nome}]?`,
                text: "Esta ação não poderá ser desfeita!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, remover!",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            })
          
            if(resultado.isConfirmed){

                try{
                    
                    await new ApiRepository().removerUsuario(usuario.id)
    
                    const linhaSelecionada = evento.target.closest("tr")
    
                    if(linhaSelecionada){
                        linhaSelecionada.remove()
                    }
                    
                    Swal.fire({
                        title: "Removido(a)!",
                        text: `Usuário ${usuario.nome} foi removido(a).`,
                        icon: "success"
                    });
                    
                }
                catch (erro)
                {
                    Swal.fire({
                        title: "Erro!",
                        text: `Falha ao remover usuário: ${erro.message}`,
                        icon: "error"
                    })
                }
            
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Cancelado",
                    text: "A exclusão foi cancelada :)",
                    icon: "info"
                });
            }
        })

        btnEditar.addEventListener("click",function(evento){
            
            formulario["idUsuario"].value = usuario.id // 🠖 Captura o ID para o formulário
            nomeInput.value = usuario.nome
            emailInput.value = usuario.email

            btnConfirmaUsuario.classList.replace("bi-plus-circle-fill", "bi-pen-fill")
            idLoading.classList.remove("ocultar")

        })

    });
}



pesquisarInput.addEventListener("input",function(evento){

    const pesquisa = pesquisarInput.value.trim().toLowerCase()

    if(pesquisa === ""){
        renderizarTabela()
        return 
    }

    //verifica se o texto do campo nome contém o valor da variável pesquisa.
    const usuariosFiltrados = listaUsuariosCache.filter(u => u.nome.toLowerCase().includes(pesquisa))

    renderizarTabela(usuariosFiltrados)

})

