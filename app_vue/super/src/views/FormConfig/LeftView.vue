<script setup>
const emits = defineEmits(['add'])
const list = [
  {
    title: '输入框',
    k: '',
    v: '',
    remark:'',
    type: 'input',
    width: '280px',
    disabled: false,
    labelWidth: '120px',
    placeholder: '请输入'
  },
  {
    title: '文本域',
    k: '',
    v: '',
    remark: '',
    type: 'textarea',
    rows:2,
    width: '280px',
    disabled: false,
    labelWidth: '120px',
    placeholder: '请输入文本'
  },
  {
    title: '单选',
    k: '',
    v: '',
    remark: '',
    type: 'radio',
    disabled: false,
    labelWidth: '120px',
    option: [
      {
        label: '选择一',
        value: '0',
      }, {
        label: '选择二',
        value: '1',
      }
    ]
  },
  {
    title: '多选',
    k: '',
    v: [],
    remark: '',
    type: 'checkbox',
    disabled: false,
    labelWidth: '120px',
    option: [
      {
        label: '选择一',
        value: '1'
      }, {
        label: '选择二',
        value: '2'
      }
    ]
  },
  {
    title: '选择框',
    k: '',
    v: '',
    remark: '',
    type: 'select',
    width: '280px',
    disabled: false,
    labelWidth: '120px',
    placeholder: '请选择',
    option: [
      {
        label: '区域一',
        value: '1'
      }, {
        label: '区域二',
        value: '2'
      }
    ]
  },
  {
    title: '开关',
    k: '',
    v: '1',
    remark: '',
    type: 'switch',
    disabled: false,
    labelWidth: '120px'
  },
  {
    title: '日期',
    k: '',
    v: '',
    remark: '',
    type: 'date',
    width: '280px',
    disabled: false,
    labelWidth: '120px',
    placeholder: '请选择日期'
  },
  {
    title: '文件上传',
    k: '',
    v: '',
    remark: '',
    type: 'upload',
    path:'',
    uploadType: '',
    labelWidth: '120px',
  },
]
</script>
<template>
 <div class="s_form_config_left">
   <div @click="emits('add',JSON.parse(JSON.stringify(item)))" v-for="(item, index) in list" :key="index" class="s-list">
     <div class="s-box g-flex-align-center g-flex-justify-center">
       <el-image class="s-box-img" :src="'/img/svg/'+item.type+'.svg'" fit="contain"/>
       <span class="s-box-name">{{ item.title }}</span>
     </div>
   </div>
 </div>
</template>

<style lang='scss'>
.s_form_config_left {
  .s-list {
    padding: 8px;
    .s-box {
      height: 44px;
      width: 100px;
      background: var(--g-white);
      box-shadow: 0 0 8px 4px rgba(203, 204, 205, 0.36);
      border-radius: 10px;
      cursor: pointer;
      color: #303133;
      .s-box-img {
        width: 18px;
        height: 18px;
      }
      .s-box-name {
        font-size: 14px;
        padding-left: 4px;
      }
    }
  }
}
</style>