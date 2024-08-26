<script setup>
const prop = defineProps(['topList',"tableData"])
</script>

<template>
  <div class="table-container">
    <ul class="table-top">
      <li v-for="(item, index) in topList" :style="{ width: item.width ? item.width : 'auto', flex: item.width ? 'none' : 1 }" :key="index">
        <p :style="{justifyContent: item.align || 'left' }">
          <span>{{ item.title }}</span>
          <span v-if="item.order">
            <svg t="1710244059142" class="icon" viewBox="0 0 1317 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6873" width="200" height="200"><path d="M0 1024 1316.571429 1024 658.285714 0 0 1024Z" fill="#A9B2BA" p-id="6874"></path></svg>
            <svg t="1710244086363" class="icon" viewBox="0 0 1317 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7832" width="200" height="200"><path d="M0 0 1316.571429 0 658.285714 1024 0 0Z" fill="#A9B2BA" opacity="0.5" p-id="7833"></path></svg>
          </span>
        </p>
      </li>
    </ul>
    <ul class="list">
      <li v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <div class="info">
          <div class="details" :style="{ width: column.width ? column.width : 'auto', flex: column.width ? 'none' : 1, justifyContent: column.align || 'left'  }" v-for="(column, columnIndex) in topList" :key="columnIndex">
            <p v-if="column.type === 'index'">{{rowIndex + 1}}</p>
            <slot :name="column.key" :row="rowData">{{rowData[column.key]}}</slot>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.table-container{
  .table-top{
    height: 56px;
    display: flex;
    align-items: center;
    li{
      font-weight: 400;
      font-size: 12px;
      color: #616161;
      flex: 1;
      //line-height: 56px;
      p{
        width: 100%;
        display: flex;
        align-items: center;
        span{
          display: flex;
          align-items: center;
          flex-direction: column;
          white-space: nowrap;
          svg{
            width: 14px;
            height: 5px;
            &:last-child{
              margin-top: 3px;
            }
            //color: black;
          }
        }
      }

    }
  }
  .list{

    li {
      font-weight: 400;
      font-size: 12px;
      color: #616161;
      margin-bottom: 15px;
      .info{
        display: flex;
        align-items: center;
        .details{
          font-weight: 400;
          font-size: 12px;
          color: #000000;
          line-height: 17px;
          //white-space: nowrap;
          //overflow: hidden;
          //text-overflow: ellipsis;
          p{
            width: 20px;
            height: 20px;
            background: #DEDCDD;
            border-radius: 3px 3px 3px 3px;
            font-weight: bold;
            font-size: 14px;
            color: #616161;
            text-align: center;
            line-height: 20px;
          }
        }
      }
      &:nth-of-type(1) > .info > .details >p{
        background: #0F9E7B;
        color: white;
      }
      &:nth-of-type(2) > .info > .details >p{
        background: #0F9E7B;
        color: white;
        opacity: 0.6;
      }
      &:nth-of-type(3) > .info > .details >p{
        background: #0F9E7B;
        color: white;
        opacity: 0.4;
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>
