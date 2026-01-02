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

        // 🔒 NÃO APAGA O QUE JÁ EXISTE
        if (listaDeLinks.length > 0) {
            container.insertAdjacentHTML(
                'beforeend',
                listaDeLinks.map(item => gerarTemplateCard(item)).join('')
            );
        }

        // Se não houver links no banco, mantém o link fixo
        if (listaDeLinks.length === 0 && container.children.length === 0) {
            container.innerHTML = `
                <p class="text-center py-5 text-muted">
                    Nenhum recurso cadastrado ainda.
                </p>
            `;
        }

    } catch (erro) {
        console.error(erro);
        container.innerHTML = `
            <div class="alert alert-danger">
                Erro ao carregar base de dados.
            </div>
        `;
    }
}

iniciarPagina();
