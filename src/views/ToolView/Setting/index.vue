<script setup>
const exportData = () => { 
  const file = new Blob([localStorage.getItem('navList')], {
    type: 'application/json'
  });
  const fileUrl = URL.createObjectURL(file);
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', fileUrl);
  linkElement.setAttribute('download', 'ying-nav-data.json');
  linkElement.click();
}
const importData = () => {
  let fileInput = document.createElement('input')
  fileInput.setAttribute('type', 'file')
  fileInput.click()
  fileInput.onchange = () => {
    if(fileInput.files[0].type === 'application/json') {
      let reader = new FileReader()
      reader.onload = () => {
        localStorage.setItem('navList', reader.result)
      }
      reader.readAsText(fileInput.files[0]);
    } else {
      console.log("请导入正确的文件")
    }
  }
}
</script>

<template>
  <div>
    <div class="btn" @click="exportData">导出数据</div>
    <div class="btn" @click="importData">导入数据</div>
  </div>
</template>

<style lang="scss" scoped>

</style>