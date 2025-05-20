export  class ApiRepository{


    url = "https://67edddcd4387d9117bbec5f3.mockapi.io/CadUsuarios/usuarios"
    
    async criarUsuario(nome,email){
        
        try{
            let respostaApi = await fetch(this.url,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({nome: nome, email:email})
            })

            if(!respostaApi.ok){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Erro ao adicionar usuarios: ${respostaApi}`,
                });
                return
            }

            let usuario = await respostaApi.json()

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuário cadastrado!",
                text: `Sucesso ao cadastrar usuário`,
                showConfirmButton: false,
                timer: 1500
            })

            return usuario

        }catch(erro){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            return
        }
        
    }

    async carregarUsuarios(){

        try{

            let respostaApi = await fetch(this.url)
            
            if(!respostaApi.ok){

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Erro ao carregar usuarios da Api: ${respostaApi}`,
                });
                return 
            }
            let listaUsuario = await respostaApi.json()

            return listaUsuario

        }catch(erro){
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            return
        }
    }

    async removerUsuario(id){

        try{
            let respostaApi = await fetch(`${this.url}/${id}`,{
                method: 'DELETE'
            })

            if(!respostaApi.ok){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Erro ao remover usuario: ${respostaApi}`,
                });
                return
            }

            let usuario = await respostaApi.json()
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuário removido!",
                text: `Sucesso ao remover usuário`,
                showConfirmButton: false,
                timer: 1500
            })

            return usuario


        }catch(erro){
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            return
        }
    }

    async atualizarUsuario(nome,email,id){

        try{
            let respostaApi = await fetch(`${this.url}/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email:email
                })
            })

            if(!respostaApi.ok){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Erro ao atualizar usuario: ${respostaApi}`,
                });
                return
            }

            let usuario = await respostaApi.json()
            
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuário atualizado!",
                text: `Sucesso ao atualizar usuário`,
                showConfirmButton: false,
                timer: 1500
            })

            return usuario


        }catch(erro){
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            return
        }
    }
}