package br.com.isiflix.salutar.service.midia;

import br.com.isiflix.salutar.models.Midia;

public interface IMidiaService {

    public Midia cadrastrarNova(Midia midia);
    public Midia alterarDados(Midia midia);
    public boolean excluir(Integer id);
    public Midia recuperarPeloId(Integer id);
}