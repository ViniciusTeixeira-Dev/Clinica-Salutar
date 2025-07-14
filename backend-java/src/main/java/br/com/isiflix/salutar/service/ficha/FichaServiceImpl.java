package br.com.isiflix.salutar.service.ficha;

import br.com.isiflix.salutar.dao.FichaPacienteDAO;
import br.com.isiflix.salutar.models.FichaPaciente;
import br.com.isiflix.salutar.models.Midia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class FichaServiceImpl implements IFichaService{

    @Autowired
    private FichaPacienteDAO dao;

    @Override
    public FichaPaciente cadastrar(FichaPaciente nova) {
        nova.setUuid(UUID.randomUUID().toString());
        nova.setIdFicha(null);
        nova.setAtivo(1);
        for (Midia m : nova.getMidias()){
            m.setFicha(nova);
        }
        return dao.save(nova);
    }

    @Override
    public FichaPaciente alterar(FichaPaciente ficha) {

        FichaPaciente tmp = dao.findById(ficha.getIdFicha()).orElse(null);
        if(tmp != null){
            tmp.setAtivo(ficha.getAtivo());
        }
        for (Midia m : ficha.getMidias()){
            m.setFicha(ficha);
        }
        return dao.save(ficha);
    }


    @Override
    public List<FichaPaciente> buscarPorNome(String nome) {

        return dao.findByNomePacienteContaining(nome);
    }

    @Override
    public FichaPaciente recuperarPeloId(Integer id) {
        return dao.findById(id).orElse(null);
    }

    @Override
    public boolean excluir(Integer id) {
        FichaPaciente ficha = recuperarPeloId(id);
        if(ficha != null){
            ficha.setAtivo(0);
            dao.save(ficha);
            return true;
        }
        return false;
    }
}
