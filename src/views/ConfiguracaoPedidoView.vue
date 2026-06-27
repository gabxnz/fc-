<template>
  <div>
    <h1 class="titulo-pagina">Personalizar Encomenda</h1>
    <pedido-component-vue :burguer="camisaSelecionada" />
  </div>
</template>

<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      camisaSelecionada: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    const dadosManto = query.camisa || query.burguer;
    
    if (dadosManto) {
      const decodeCamisa = JSON.parse(decodeURIComponent(dadosManto));
      this.camisaSelecionada = decodeCamisa;
    }
  },
};
</script>

<style scoped>
.titulo-pagina {
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  font-size: 28px;
  font-weight: bold;
}
</style>