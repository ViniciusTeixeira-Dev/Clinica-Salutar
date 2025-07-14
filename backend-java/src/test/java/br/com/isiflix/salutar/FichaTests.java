package br.com.isiflix.salutar;

import br.com.isiflix.salutar.models.FichaPaciente;
import br.com.isiflix.salutar.service.ficha.IFichaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ActiveProfiles("test")
public class FichaTests {

    @Autowired
    IFichaService service;

    @Test
    public void shouldCreateFicha(){
        FichaPaciente f = new FichaPaciente();
        f.setNomePaciente("isidro");
        FichaPaciente res = service.cadastrar(f);
        assertTrue(res != null && res.getUuid() != null && res.getAtivo() == 1);
    }

    @Test
    public void shouldDeleteFicha(){
        assertTrue(service.excluir(2));
    }

    @Test
    public void shouldNotDeleteFicha() {
        assertFalse(service.excluir(313113));

    }

    @Test
    public void shoudReturnSeveralFicha(){
        List<FichaPaciente> lista = service.buscarPorNome("a");
        assertTrue(lista.size() > 0);
    }

    @Test
    public void shouldNotFindFicha(){
        List<FichaPaciente> lista = service.buscarPorNome("Adamastor");
        assertTrue(lista.size() == 0);
    }
}
