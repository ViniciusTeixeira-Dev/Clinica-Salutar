package br.com.isiflix.salutar.controller;

import br.com.isiflix.salutar.models.Midia;
import br.com.isiflix.salutar.service.midia.IMidiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class MidiaController {

    @Autowired
    private IMidiaService service;

    @GetMapping("/midias/{id}")
    public ResponseEntity<Midia> recuperarPeloId(@PathVariable Integer id){
        Midia m = service.recuperarPeloId(id);
        if(m != null){
            return ResponseEntity.ok(m);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/midias")
    public ResponseEntity<Midia> adicionarNova(@RequestBody Midia midia){
        Midia res = service.cadrastrarNova(midia);
        if (res != null){
            return ResponseEntity.status(201).body(res);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/midias/{id}")
    public ResponseEntity<Midia> alterarDados (@RequestBody Midia midia, @PathVariable Integer id){
        if(midia.getNumSeq() == null){
            midia.setNumSeq(id);
        }
        Midia res = service.alterarDados(midia);
        if(res != null){
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/midias/{id}")
    public ResponseEntity<?> excluirMidia(@PathVariable Integer id){
        if(service.excluir(id)){
            return ResponseEntity.ok("ok");
        }
        return ResponseEntity.notFound().build();
    }
}
