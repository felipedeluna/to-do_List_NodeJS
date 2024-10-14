$('#formularioLogin').submit(async (evento) => {
    evento.preventDefault();
    const email = $('#inputEmail').val();
    const senha = $('#inputSenha').val();

    try {

        const response = await $.ajax({
            url: '/api/usuario/logar',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, senha })
        });

        localStorage.setItem('token', response.token);
        alert('Login realizado com sucesso!')
        window.location.href = '/';
    } catch (error) {
        alert('Erro ao fazer login');
    }
});