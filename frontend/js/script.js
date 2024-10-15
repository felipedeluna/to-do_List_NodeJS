$(document).ready(async function (){
    
  let token = localStorage.getItem('token');
  if (token) {
    $('#loginButton').hide();
    $('#cadastroButton').hide();
    $('#tracoLogin').hide();
    carregarTarefas();
  }else{
    alert('Crie uma conta ou entre em uma já existente para usar nossa aplicação!');
    $('#logoutButton').hide();
  }

    //adicionar tarefa
    $('#formularioTarefas').submit(async(event)=>{
        event.preventDefault();

        token = localStorage.getItem('token');
        const novaTarefa = $('#novaTarefa').val();

        try{
          await $.ajax({
            url: 'api/tasks/',
            method: 'POST',
            contentType: 'application/json',
            headers: { Authorization: `Bearer ${token}` },
            data: JSON.stringify({ titulo: novaTarefa })
            
          })

          $('#novaTarefa').val('');
          await carregarTarefas();
        }catch(error){
          if(!localStorage.getItem('token')){
            alert('É necessário estar autenticado para o uso da aplicação.');
          }else if(error.responseJSON.error == 'Token inválido'){
            localStorage.removeItem('token');
            alert('Sessão encerrada, faça login novamente.');
            window.location.href = '/login';
          }else{
            alert('Erro ao adicionar tarefas. Tente novamente.');
          }
        }
    });

}
);

//carregar tarefas
async function carregarTarefas(event) {
        
  token = localStorage.getItem('token');

  try{
      const tarefas = await $.ajax({
        url: 'api/tasks/',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })

      $('#listaDeTarefas').empty();
      tarefas.forEach(tarefa => {

        const checked = tarefa.status === 'concluido' ? 'checked' : '';

        $('#listaDeTarefas').append(`
        <li class="list-group-item d-flex justify-content-between ">
        <div class="d-flex align-items-center">
          <input class="form-check-input me-1 mt-0" type="checkbox" value="" id="checkbox-${tarefa._id}" ${checked}>
          <label class="form-check-label" for="checkbox-${tarefa._id}">${tarefa.titulo}</label>
        </div>
          <button class="btn btn-danger btn-sm ms-2" type="button" onclick="removerTarefa('${tarefa._id}')"><i class="bi bi-trash"></i></button>
        </li>  
      `)});


  }catch(error){
      console.error('Erro ao carregar tarefas:', error.responseJSON);
      if(error.responseJSON.error == 'Token inválido'){
        localStorage.removeItem('token');
        alert('Sessão encerrada, faça login novamente.');
        window.location.href = '/login';
      }else{
        alert('Erro ao carregar tarefas. Tente novamente.');
      }
  }

}

//captura a mudança de estado do checkbox
$('#listaDeTarefas').on('change', 'input[type="checkbox"]', function() {
  const tarefaId = $(this).attr('id').split('-')[1];
  const novoStatus = $(this).is(':checked') ? 'concluido' : 'pendente';

  atualizarStatusTarefa(tarefaId, novoStatus);
});

//atualizar status da tarefa
async function atualizarStatusTarefa(tarefaId, novoStatus) {
  token = localStorage.getItem('token');

  try {
      await $.ajax({
          url: `api/tasks/${tarefaId}`,
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          contentType: 'application/json',
          data: JSON.stringify({ status: novoStatus })
      });

      carregarTarefas();
  } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
      alert('Erro ao atualizar status da tarefa. Tente novamente.');
  }
}

//remover tarefa
async function removerTarefa(tarefaId) {
  token = localStorage.getItem('token');

  try {
    await $.ajax({
        url: `api/tasks/${tarefaId}`,
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        contentType: 'application/json',
    });

    carregarTarefas();
} catch (error) {
    console.error('Erro ao atualizar status da tarefa:', error);
    alert('Erro ao atualizar status da tarefa. Tente novamente.');
}
}

async function logout(){
  localStorage.removeItem('token');
  alert('Sessão encerrada');
  window.location.href = '/';
}

