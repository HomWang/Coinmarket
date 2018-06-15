<!-- 输入框，已废弃 -->
<template>
  <section style="position: relative" :class="{'cm-font__disabled': disabled}">
    <input :type="type" name="買入價"
        v-model="value" class="cm-input"
        :class="{'cm-input__disabled': disabled}"
        :style="styleObject"
        :disabled="disabled"
        :formatMethod="formatMethod"
        @input="handleChange(value)">
    <div  class="cm-preholder">
      <slot name="preholder">
      </slot>
    </div>
    <div  class="cm-sufholder">
      <slot name="sufholder">
      </slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Input',

  props: {
    content: {
      type: String,
    },
    formatMethod: {
      type: Function,
    },
    fontSize: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',
    },
  },

  data() {
    return {
      value: this.content,
      // domValue: '',
      styleObject: {
        fontSize: this.fontSize,
      },
    }
  },

  computed: {
  },

  methods: {
    handleChange(value) {
      if (this.formatMethod) {
        this.value = this.formatMethod(value);
        this.$emit('input-change', this.value);
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/styles/mixins.scss';

.cm-input {
  background-color: unset;
  width: 100%;
  line-height: 40px;
  color: $primaryFontColor;
  border-radius: 5px;
  padding: 0 0 0 50px;
  border: 1px solid #fff;
}
.cm-preholder {
  position: absolute;
  left: 5px;
  top: 0;
  line-height: 40px;
}
.cm-sufholder {
  position: absolute;
  right: 5px;
  top: 0;
  line-height: 40px;
}
.cm-input__disabled {
  color: $unselectColor;
  border: 1px solid $unselectColor;
}
.cm-font__disabled {
  color: $unselectColor;
}
</style>
