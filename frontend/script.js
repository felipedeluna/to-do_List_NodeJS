$(document).ready(function (){
    

    //adicionar tarefa
    $('#formularioTarefas').submit(function(event){
        event.preventDefault();

        const novaTarefa = $('#novaTarefa').val();
        
        console.log(novaTarefa)

        $('#novaTarefa').val("")
    });

    //remover tarefa
    async function removerTarefa(tarefaId) {
        
    }

    //carregar tarefas
    async function carregarTarefas(event) {
        const tarefas = [
            {
              "_id": "6529c9e1d5b4a814f7e9b8a1",
              "title": "Estudar Node.js e MongoDB",
              "status": "pendente",
              "created_at": "2024-10-13T10:30:00.000Z"
            },
            {
              "_id": "6529ca32d5b4a814f7e9b8a2",
              "title": "Fazer exercícios de JavaScript",
              "status": "completa",
              "created_at": "2024-10-12T15:00:00.000Z"
            },
            {
              "_id": "6529ca65d5b4a814f7e9b8a3",
              "title": "Preparar slides para apresentação",
              "status": "pendente",
              "created_at": "2024-10-13T09:00:00.000Z"
            }
          ]

        tasks.forEach(task => {

        })
    }

}
);