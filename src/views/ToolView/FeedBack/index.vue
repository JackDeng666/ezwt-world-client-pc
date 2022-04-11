<script setup>
import { io } from "socket.io-client"
import { ref, onMounted, getCurrentInstance } from 'vue'
const socket = io('http://localhost:8080', {
  withCredentials: true,
  extraHeaders: {
    "token-header": "abcd"
  }
})
socket.on('csToUser', (data) => {
  msgList.value.push({ content: data })
  scrollToBottom()
})
const msgList = ref([])
const content = ref('')
const { proxy } = getCurrentInstance()
const send = () => {
  if(content.value) {
    msgList.value.push({ content: content.value, isMe: true })
  }
  socket.emit('userToCs', content.value)
  content.value = ""
  scrollToBottom()
}
const scrollToBottom = () => {
  proxy.$nextTick(() => {
    proxy.$refs['msg_end'].scrollIntoView()
  })
}
let prekey = '' 
const keydown = event => {
  if(prekey != "Shift" && event.key == "Enter") {
    send()
    event.preventDefault()
  }
  prekey = event.key
}
onMounted(() => {
  proxy.$parent.$refs['popContent'].style.padding = "0 0"
})
</script>

<template>
  <div class="fixed-wrap">
    <div class="content-wrap">
      <div class="msg-item" :class="{ me: item.isMe }" v-for="(item, i) in msgList" :key="i">
        <img class="avatar" :src="item.isMe ? '/images/keqin.jpg' : '/images/ganyu.jpg'">
        <div class="right">
          <pre class="msg-content">{{item.content}}</pre>
        </div>
      </div>
      <div ref="msg_end" style="height:0px; overflow:hidden"></div>
    </div>
    <div class="bottom-wrap">
      <textarea class="textarea" placeholder="请输入内容" type="text" v-model="content" @keydown="keydown"></textarea>
      <div class="btns">
        <button class="send" type="button" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fixed-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .content-wrap {
    flex: 1;
    height: 1px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #f7f7f7;
    &::-webkit-scrollbar {
      width: 5px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background: #d8d8d8;
      &:hover {
        background: #c2c2c2;
      }
      &:active {
        background: $basic-color;
      }
    }
    .msg-item {
      display: flex;
      margin: 5px 0;
      &.me {
        flex-direction: row-reverse;
      }
      .avatar {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        border: 1px solid #e5e6e7;
        margin: 0 8px;
      }
      .right {
        .msg-content {
          margin-top: 5px;
          background-color: #feffff;
          padding: 10px 10px;
          word-break: break-all;
          word-wrap: break-word;
          color: #000;
          border-radius: 3px;
          max-width: 500px;
          box-sizing: border-box;
          border: 1px solid #e5e6e7;
        }
      }
    }
  }
  .bottom-wrap {
    height: 100px;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ddd;
    padding-top: 5px;
    .textarea {
      border: none;
      resize: none;
      outline: none;
      height: 50px;
      font-family: "Helvetica Neue",Helvetica,"Microsoft Yahei",Arial,sans-serif;
      &::-webkit-scrollbar {
        width: 5px;
      }
      /* 滚动条滑块 */
      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background: #d8d8d8;
        &:hover {
          background: #c2c2c2;
        }
        &:active {
          background: $basic-color;
        }
      }
    }
    .btns {
      height: 25px;
      text-align: right;
      margin-top: 5px;
      .send {
        height: 100%;
        width: 45px;
        background: $basic-color;
        border: none;
        outline: none;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
  }
}
</style>