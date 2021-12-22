<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="card">
      ff
    </div>
    <button @click="changeStyle">改变</button>
    <button @click="go">11</button>
  </div>
</template>

<script>

export default {
  methods: {
    changeStyle() {
      document.documentElement.style.setProperty('--basic-color', 'yellow');
    },
    go() {
      let object = {
        op: 'sad',
        ha: [
          {a: 'aa'},
          {a: 'aa'}
        ]
      }
      const content = JSON.stringify(object)
      const file = new Blob([content], {
        type: 'application/json'
      });
      const fileUrl = URL.createObjectURL(file);
      const linkElement = document.createElement('a');
      linkElement.innerHTML = '点击下载';
      linkElement.setAttribute('href', fileUrl);
      linkElement.setAttribute('download', 'text.json');
      linkElement.click();
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  background: $basic-color;
}
</style>
