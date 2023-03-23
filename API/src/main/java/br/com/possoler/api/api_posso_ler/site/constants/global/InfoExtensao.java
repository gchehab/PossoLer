package br.com.possoler.api.api_posso_ler.site.constants.global;

import lombok.Getter;

public enum InfoExtensao {
    VERSAO_EXTENSAO("287"),
    DATA_PUBLICACAO("23/03/2023");

    @Getter
    private String label;

    InfoExtensao(String label) {
        this.label = label;
    }
}
