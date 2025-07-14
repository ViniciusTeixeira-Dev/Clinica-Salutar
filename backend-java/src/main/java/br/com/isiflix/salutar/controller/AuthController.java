package br.com.isiflix.salutar.controller;

import br.com.isiflix.salutar.dao.UsuarioDAO;
import br.com.isiflix.salutar.models.Usuario;
import br.com.isiflix.salutar.security.SalutarToken;
import br.com.isiflix.salutar.service.auth.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private IAuthService service;

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> adicionarNovo(@RequestBody Usuario novo){
        Usuario res = service.criarUsuario(novo);
        if(res != null){
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/login")
    public ResponseEntity<SalutarToken> efetuarLogin(@RequestBody Usuario dadosLogin){
        SalutarToken token = service.realizarLogin(dadosLogin);
        if(token != null){
            return ResponseEntity.ok(token);
        }

        return ResponseEntity.status(403).build();
    }
}
