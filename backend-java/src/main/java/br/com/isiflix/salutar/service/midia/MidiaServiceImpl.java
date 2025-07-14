package br.com.isiflix.salutar.service.midia;

import br.com.isiflix.salutar.dao.MidiaDAO;
import br.com.isiflix.salutar.models.Midia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MidiaServiceImpl implements IMidiaService{

    @Autowired
    private MidiaDAO dao;

    @Override
    public Midia cadrastrarNova(Midia midia) {
        return dao.save(midia);
    }

    @Override
    public Midia alterarDados(Midia midia) {
        return dao.save(midia);
    }

    @Override
    public boolean excluir(Integer id) {
        if(dao.existsById(id)){
            dao.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Midia recuperarPeloId(Integer id) {
        return dao.findById(id).orElse(null);
    }
}
