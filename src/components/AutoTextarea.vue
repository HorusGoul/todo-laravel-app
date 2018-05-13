<template>
  <textarea
    ref="content"
    :value="value"
    @input="onInput" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'auto-textarea',
  props: ['value'],
  watch: {
    value: {
      handler: function () {
        Vue.nextTick(() => this.resizeTextarea());
      }
    }
  },
  methods: {
    onInput() {
      const textarea = this.$refs.content as HTMLTextAreaElement;
      this.$emit('input', textarea.value);
    },

    resizeTextarea() {
      const textarea = this.$refs.content as HTMLTextAreaElement;

      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  },
  
  mounted() {
    this.resizeTextarea();
  }
})
</script>

<style scoped>
  textarea {
    resize: none;
    overflow: hidden;
  }
</style>

