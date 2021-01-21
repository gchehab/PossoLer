let currentURL = window.location.hostname;


if(currentURL.includes("folha.uol.com.br")){
    modifyFLSP();

}else if(currentURL.includes("estadao.com.br")){
    modifyESTADAO();

}else if(currentURL.includes("oglobo.globo.com")){
    modifyGLOBO();
}
else if(currentURL.includes("gazetadopovo.com.br")){
    modifyGAZETA();
}



/* ====================== GAZETA ================================= */

function modifyGAZETA()
{

    fetch(document.location.href)
    .then(response => response.text())
    .then(pageSource => {

        console.clear();

        let blocoNoticia = new DOMParser().parseFromString(pageSource,"text/html").getElementById("tp-post-content");
        let pai = getFatherElementGAZETA();

        let rotina = setInterval(()=>{
            if(verificaBloqueioGAZETA()){
                clearInterval(rotina);
    
                removeBlockGAZETA();
                document.getElementById("tp-post-content").remove();
                pai.appendChild(blocoNoticia);
                removeFooterGAZETA();
            }
        },800);
    });
}


function verificaBloqueioGAZETA()
{
    console.log('LOOP BLOQUEIO')
    return document.querySelector(".tp-container-inner")!=null ? true : false;
}


function getFatherElementGAZETA()
{
    console.log('LOOP GET FATHER')
    return document.querySelector(".tpl-post");
}


function removeBlockGAZETA()
{
    document.querySelector(".tp-container-inner").remove();
}


function removeFooterGAZETA()
{
    let rotina = setInterval(()=>{
        if(document.getElementById("d-pos-footer")!=null){
            clearInterval(rotina);
            document.getElementById("d-pos-footer").remove();
        }
    }, 800);
}

/* ====================== O GLOBO ================================ */

function modifyGLOBO()
{
     let rotina = setInterval(()=>{
         if(verificaComponentsGLOBO()){
             clearInterval(rotina);
             
             let divNoticia = getNoticeBlock();
             let elementoPai = getFatherElement();

             let rotinaVerificaBloqueio = setInterval(()=>{

                if(verificaDivBloqueio()){
                    clearInterval(rotinaVerificaBloqueio);
                    removeBloqueioGLOBO();
                    elementoPai.appendChild(divNoticia);
                }
             }, 800);

         }
     }, 800)
}


function verificaComponentsGLOBO()
{
    if(document.querySelector(".article__content-container")!=null){
        return true;
    }

    return false;
}


function getNoticeBlock()
{
    return document.querySelector('.article__content-container');
}


function verificaDivBloqueio()
{
    if(document.querySelector('.paywall-cpt')!=null){
        return true
    }

    return false;
}


function removeBloqueioGLOBO()
{
    //REMOVE ANUNCIO BLOQUEIO
    document.querySelector('.paywall-cpt').remove();

    //PERMITE MOVIMENTAÇÃO DA PAGINA
    document.body.style.overflow = 'auto';
    document.body.style.position = 'unset';

    //REMOVE FOOTER ANUNCIO
    try{
        document.querySelector('.banner-bottom-fixed-cpnt').remove();
    }catch(erro){
        console.log('ERRO AO REMOVER FOOTER = ' + erro);
    }
}


function getFatherElement()
{
    return document.querySelector('.article');
}


/* ====================== ESTADAO ================================ */

function modifyESTADAO()
{
    let rotina = setInterval(()=>{
        if(verificaComponentsEST()){
            clearInterval(rotina);
            removeBloqueioEST();
        }
    }, 800)
}


function verificaComponentsEST()
{
    if(document.getElementById('paywall-wrapper-iframe-estadao') != null){
        return true;
    }

    return false;
}


function removeBloqueioEST()
{
    document.getElementById('paywall-wrapper-iframe-estadao').remove();
    document.querySelector('html').style.overflow = 'auto';
    document.querySelector('html').style.width = 'auto';
    document.querySelector('html').style.position = 'unset';
}

/* ====================== FOLHA DE SP ============================ */

function modifyFLSP()
{
    let rotina = setInterval(() => {
        if(verificaComponents()){
            clearInterval(rotina);
            removeBloqueio();
        }
    }, 800);
}


function verificaComponents()
{
    if(document.getElementById('paywall-flutuante') != null && document.getElementById('paywall-content') != null && document.getElementById('paywall-fill') != null){
        return true;
    }

    return false;
}


function removeBloqueio()
{
    document.getElementById('paywall-flutuante').remove();
    document.getElementById('paywall-fill').remove();

    document.getElementById('paywall-content').style.overflow = 'auto';
}