package br.com.isiflix.salutar.service.auth;

import br.com.isiflix.salutar.models.Usuario;
import br.com.isiflix.salutar.security.SalutarToken;

public interface IAuthService {

    public Usuario criarUsuario(Usuario novo);
    public SalutarToken realizarLogin(Usuario dadosLogin);
}
