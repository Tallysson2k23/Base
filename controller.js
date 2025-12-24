import { buscarLinksDoBanco } from './firebase-config.js';

const container = document.getElementById('container-links');

function gerarTemplateCard(item) {
    return `
        <div class="link-item">
            <div class="link-info">
                <div class="link-icon">
                    <i class="fas fa-file-signature"></i>
                </div>
                <div>
                    <h5 class="mb-1 fw-bold">${item.titulo}</h5>
                    <p class="mb-0 text-muted small">${item.descricao}</p>
                </div>
            </div>
            <a href="${item.url}" target="_blank" class="btn-access">Acessar</a>
        </div>
    `;
}

async function iniciarPagina() {
    try {
        const listaDeLinks = await buscarLinksDoBanco();
        container.innerHTML = listaDeLinks.length > 0 
            ? listaDeLinks.map(item => gerarTemplateCard(item)).join('')
            : '<p class="text-center py-5">Nenhum recurso cadastrado ainda.</p>';
    } catch (erro) {
        container.innerHTML = '<div class="alert alert-danger">Erro ao carregar base de dados.</div>';
    }
}

iniciarPagina();