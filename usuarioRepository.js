
class usuarioRepository{

    url = "https://67edddcd4387d9117bbec5f3.mockapi.io/CadUsuarios/usuarios"


    //                          R.E.A.D                          ->

    async carregarUsuarios(){

        try{
            //Espere concluir o carregamento desta API, depois execute o restante do código...

            let respostaAPI = await fetch(this.url)

            if(!respostaAPI.ok){
                throw `Requisição chegou ao servidor, mas servidor retornou erro: ${respostaAPI}` 
            }

            let listaUsuarios = await respostaAPI.json()
            return [null, listaUsuarios]


        }
        catch(error)
        {
            return [error,null]
        }
    }

    
    //                          C.R.E.A.T.E                               ->
    async criarUsuarios(nome, email){

    
        try{
            
            let respostaAPI = await fetch(this.url,{
                method: 'POST',//[POST] - Usado para enviar dados para um servidor
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({nome: nome, email:email})
            })

            if(!respostaAPI.ok){
                throw `Requisição chegou ao servidor, mas servidor retornou erro: ${respostaAPI}`    

            }

            let usuario = await respostaAPI.json()
            return [null,usuario]

        }
        catch(error)
        {
            return [error,usuario]
        }
    }

    
    //                          U.P.D.A.T.E                            ->
    async atualizarUsuarios(nome,email,idusuario){

        try {

            //Espere concluir o carregamento desta API, depois execute o restante do código...

            let respostaAPI = await fetch(`${this.url}/${idusuario}`, {//usuarios[/] <- Barra obrigatória
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            })
                

            if(!respostaAPI.ok){
                throw `Requisição chegou ao servidor, mas servidor retornou erro: ${respostaAPI}`    
            }


            let usuario = await respostaAPI.json()
            return [null, usuario]

        } 
        catch (error) 
        {
            //    [error,usuários] <-- Erro é verdadeiro, usuários é null
            return [error, null]
        }
    }
    
    
    //                          D.E.L.E.T.E                            ->
    
    async removerUsuarios(idusuario){

        try {

            //Espere concluir o carregamento desta API, depois execute o restante do código...

            let respostaAPI = await fetch(`${this.url}/${idusuario}`, {
                    
                //[DELETE] 
                method: 'DELETE'
                })
                

            if(!respostaAPI.ok){
                throw `Requisição chegou ao servidor, mas servidor retornou erro: ${respostaAPI}`    
            }


            let usuario = await respostaAPI.json()
            return [null, usuario]

        } 
        catch (error) 
        {
            //    [error,usuários] <-- Erro é verdadeiro, usuários é null
            return [error, null]
        }
    }
    
}