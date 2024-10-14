$('#formularioCadastro').submit(async (evento) => {
    evento.preventDefault();

    const email = $('#inputEmail').val();
    const senha = $('#inputSenha').val();
    const confirmarSenha = $('#inputConfirmarSenha').val();

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        const response = await $.ajax({
            url: '/usuario/registrar',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, senha })
        });

        console.log('Resposta do servidor:', response);

        alert('Usuário registrado com sucesso!');
        window.location.href = '/login';
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        alert(error.responseJSON?.error || 'Erro ao registrar usuário. Tente novamente.');
    }

})