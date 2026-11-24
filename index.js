function abrirModal() {
  overlay.classList.add("active");
  criarTarefa.classList.add("active");
}
function fecharModal() {
  overlay.classList.remove("active");
  criarTarefa.classList.remove("active");
}

function buscarTarefas() {
  fetch("http://localhost:3000/tarefas")
    .then((res) => res.json())
    .then((res) => {
      inserirTarefas(res);
    });
}
buscarTarefas();

function inserirTarefas(listaDeTarefas) {
  lista.innerHTML = "";

  if (
    listaDeTarefas.length > 0 &&
    listaDeTarefas.some((tarefa) => tarefa.titulo || tarefa.descricao)
  ) {
    listaDeTarefas.map((tarefa) => {
      if (!tarefa.titulo && !tarefa.descricao) return;

      lista.innerHTML += `
                <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions">
                        <i class="bx bx-trash bx-sm" onclick ="deletarTarefa(${tarefa.id})"></i>
                    </div>
                </li>
            `;
    });
  } else {
    lista.innerHTML = "<p>Nenhuma tarefa no momento</p>";
  }
}

function novaTarefa() {
  event.preventDefault();
  alert("Nova tarefa enviada");

  let tarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
  };
  fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
  fecharModal();
  buscarTarefas();
  let form = document.querySelector("#criarTarefa form");
  form.resert();
}

function deletarTarefa(id) {
  fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      alert("atividade apagada");
      buscarTarefas();
    });
}

function pesquisarTarefas(){
    let lis = document.querySelectorAll("ul li")
    if(busca.value.length > 0){
        lis.forEach(li => {
           if( !li.children[0].innerText.includes(busca.value)){
            li.classList.add('oculto');
           }else{
            li.classList.remove('oculto');
           }
        
        })
    } else {
        lis.forEach(li => {
            li.classList.remove('oculto');
        })
    }
}