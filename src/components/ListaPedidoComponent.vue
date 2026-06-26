<template>
  <div>
    <div v-if="msg" class="alerta alerta-verde">
      {{ msg }}
    </div>

    <div id="pedidos-tabela">
      <div class="linha-tabela cabecalho">
        <div class="col-id">#ID</div>
        <div class="col-padrao">Cliente</div>
        <div class="col-padrao">Camisa</div>
        <div class="col-padrao">Modelo / Corte</div>
        <div class="col-padrao">Personalização</div>
        <div class="col-padrao">Status</div>
        <div class="col-acoes">Ações</div>
      </div>

      <div
        class="linha-tabela"
        v-for="pedido in listaPedidosRealizados"
        :key="pedido.id"
      >
        <div class="col-id">{{ pedido.id }}</div>
        <div class="col-padrao">{{ pedido.nome }}</div>
        <div class="col-padrao">{{ pedido.burguer ? pedido.burguer.nome : 'N/A' }}</div>
        <div class="col-padrao">{{ pedido.ponto ? pedido.ponto.descricao : 'N/A' }}</div>
        <div class="col-padrao">
          <ul>
            <li v-for="(complemento, index) in pedido.complemento" :key="index">
              {{ complemento.nome }}
            </li>
          </ul>
          <div class="divider" v-if="pedido.complemento && pedido.complemento.length && pedido.bebidas && pedido.bebidas.length"></div>
          <ul>
            <li v-for="(refri, index) in pedido.bebidas" :key="index">
              {{ refri.nome }}
            </li>
          </ul>
        </div>
        <div class="col-padrao">
          <select
            @change="atualizarStatusPedido($event, pedido.id)"
            class="status"
          >
            <option value="">Selecione</option>
            <option
              v-for="status in listaStatusPedido"
              :key="status.id"
              :value="status.id"
              :selected="status.id == pedido.statusId"
            >
              {{ status.descricao }}
            </option>
          </select>
        </div>
        <div class="col-acoes">
          <img
            @click="deletarPedido(pedido.id)"
            src="/img/icone_lixeira.png"
            width="35px"
            height="35px"
            style="cursor: pointer;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaPedidoComponent",
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      msg: null,
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      this.listaPedidosRealizados = await response.json();
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: Number(idPedidoAtualizado) });
      
      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: atualizacaoJson,
      });

      this.msg = `Status atualizado com sucesso!`;
      this.consultarPedidos(); 
      setTimeout(() => (this.msg = null), 3000);
    },
    async deletarPedido(idPedido) {
      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "DELETE",
      });

      this.msg = `Pedido removido do sistema!`;
      this.consultarPedidos();
      setTimeout(() => (this.msg = null), 3000);
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
#pedidos-tabela { 
  width: 100%; 
  max-width: 1200px;
  margin: 0 auto; 
  text-align: left;
}
.linha-tabela { 
  display: flex; 
  align-items: flex-start; 
  padding: 15px 10px;
  border-bottom: 1px dotted #ccc;
  gap: 15px; /* Aumenta o espaço em branco entre as colunas */
}
.cabecalho { 
  font-weight: bold; 
  border-bottom: 2px solid #222; 
  align-items: center; 
}

/* --- AQUI ESTÁ A MÁGICA --- */
.col-id { 
  width: 10%; /* Aumentamos de 5% para 10% para o ID respirar */
  min-width: 50px;
  font-weight: bold; 
  flex-shrink: 0;
}
.col-padrao { 
  width: 15%; /* Reduzimos de 17% para 15% para compensar o ID */
  word-wrap: break-word; 
  overflow-wrap: break-word;
}
.col-acoes { 
  width: 8%; 
  text-align: center; 
}

ul { list-style-type: none; padding: 0; margin: 0; }
li { font-size: 13px; margin-bottom: 3px; line-height: 1.4; }
.divider { border-bottom: 1px solid #ccc; margin: 8px 0; width: 80%; }
.status { padding: 6px; font-size: 13px; border-radius: 4px; border: 1px solid #ccc; width: 100%; }
.alerta { padding: 15px; margin: 15px 0; border-radius: 5px; font-weight: bold; text-align: center; }
.alerta-verde { background-color: #e5ffd9; color: #009900; border: 1px solid #009900; }
</style>