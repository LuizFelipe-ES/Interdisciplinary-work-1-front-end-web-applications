const vagaForm = document.getElementById("vagaForm");
const tabelaVagas = document.getElementById("tabelaVagas");
const publicarVaga = document.getElementById("publicarVaga");
const excluirVaga = document.getElementById("excluirVaga");

let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
let editIndex = -1;

function renderizarVagas() {
    tabelaVagas.innerHTML = '';
    vagas.forEach((vaga, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td><a href="#" class="link-vaga" data-id="${index}">${vaga.titulo}</a></td>
            <td>${vaga.salario}</td>
            <td>${vaga.contato}</td>
        `;
        tabelaVagas.appendChild(novaLinha);
    });
}

function salvarVagas() {
    localStorage.setItem("vagas", JSON.stringify(vagas));
}

document.addEventListener('DOMContentLoaded', renderizarVagas);

vagaForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nomeDaVaga = document.getElementById('nomeDaVaga').value;
    const salario = document.getElementById('salario').value;
    const contato = document.getElementById('contato').value;
    const descricao = document.querySelector('input[name="descricao"]').value;
    const requisitos = document.querySelector('input[name="requisitos"]').value;
    const responsabilidades = document.querySelector('input[name="responsabilidades"]').value;
    const beneficios = document.querySelector('input[name="beneficios"]').value;
    const escolaridade = document.querySelector('input[name="schooling"]:checked').value;
    const tipoTrabalho = document.querySelector('input[name="type-job"]:checked').value;
    const modeloTrabalho = document.querySelector('input[name="Modelo"]:checked').value;
    const diasTrabalho = document.querySelector('input[name="day"]:checked').value;
    const turnoTrabalho = document.querySelector('input[name="job"]:checked').value;
    const sobreEmpresa = document.querySelector('input[name="sobreEmpresa"]').value;
    const localizacao = document.getElementById('localizacao').value; // Capturando localização

    const novaVaga = {
        titulo: nomeDaVaga,
        salario,
        contato,
        descricao,
        requisitos,
        responsabilidades,
        beneficios,
        escolaridade,
        tipoTrabalho,
        modeloTrabalho,
        diasTrabalho,
        turnoTrabalho,
        sobreEmpresa,
        localizacao, // Incluindo localização
    };

    if (editIndex >= 0) {
        vagas[editIndex] = novaVaga;
    } else {
        vagas.push(novaVaga);
    }

    salvarVagas();
    renderizarVagas();
    vagaForm.reset();
    editIndex = -1;

    const modal = bootstrap.Modal.getInstance(document.getElementById('vagaModal'));
    modal.hide();
});

tabelaVagas.addEventListener('click', function (event) {
    if (event.target.classList.contains('link-vaga')) {
        event.preventDefault();
        const index = event.target.getAttribute('data-id');
        editIndex = index;

        const vaga = vagas[index];
        document.getElementById('nomeDaVaga').value = vaga.titulo;
        document.getElementById('salario').value = vaga.salario;
        document.getElementById('contato').value = vaga.contato;
        document.querySelector('input[name="descricao"]').value = vaga.descricao;
        document.querySelector('input[name="requisitos"]').value = vaga.requisitos;
        document.querySelector('input[name="responsabilidades"]').value = vaga.responsabilidades;
        document.querySelector('input[name="beneficios"]').value = vaga.beneficios;
        document.querySelector(`input[name="schooling"][value="${vaga.escolaridade}"]`).checked = true;
        document.querySelector(`input[name="type-job"][value="${vaga.tipoTrabalho}"]`).checked = true;
        document.querySelector(`input[name="Modelo"][value="${vaga.modeloTrabalho}"]`).checked = true;
        document.querySelector(`input[name="day"][value="${vaga.diasTrabalho}"]`).checked = true;
        document.querySelector(`input[name="job"][value="${vaga.turnoTrabalho}"]`).checked = true;
        document.querySelector('input[name="sobreEmpresa"]').value = vaga.sobreEmpresa;
        document.getElementById('localizacao').value = vaga.localizacao; // Preenchendo localização

        const modal = bootstrap.Modal.getInstance(document.getElementById('vagaModal'));
        modal.show();
        excluirVaga.style.display = 'inline-block';
    }
});

excluirVaga.addEventListener('click', function () {
    if (editIndex >= 0) {
        vagas.splice(editIndex, 1);
        salvarVagas();
        renderizarVagas();
        vagaForm.reset();
        editIndex = -1;

        const modal = bootstrap.Modal.getInstance(document.getElementById('vagaModal'));
        modal.hide();
    }
});

document.getElementById('cancelarVaga').addEventListener('click', function () {
    vagaForm.reset();
    editIndex = -1;
    excluirVaga.style.display = 'none';
});
