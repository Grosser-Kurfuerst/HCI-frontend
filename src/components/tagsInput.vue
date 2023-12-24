<template>
    <div class="tags_input">
        <el-tag
                v-for="(tag,index) in list"
                :key="index"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input
                type="text"
                :placeholder="placeholder"
                v-model="value"
                @keyup.enter.native="add">
        </el-input>
    </div>
</template>
<script>
export default {
    name:'TagsInput',
    props: {
        listFilter: Boolean, // 是否去重
        defaulList: null,    // 默认值
        placeholder: null // 占位文字
    },
    data() {
        return {
            value: '',
            list: [],
        }
    },
    watch:{
        defaulList: {
            handler(newVal) {
                this.list = newVal
            },
            deep: true
        }
    },
    mounted() {
        this.list = this.defaulList
        this.$emit('input', this.list)  // 发送给父级的tagslist
    },
    methods: {
        add() {
            let self = this
            if (self.value != '' || self.value != ' ') {
                self.list.push(self.value)
                if (self.listFilter) {
                    let arr = self.list
                    let set = new Set(arr)
                    self.list = Array.from(set)
                }
            }
            self.value = ''
            self.$emit('input', self.list)
        },
        handleClose(tag) {
            let self = this
            self.$emit('tagClose', tag)
            self.list.splice(self.list.indexOf(tag), 1);
        },

    }
}
</script>
<style lang="scss">
.tags_input .el-input__inner {
  border: none;
  padding: 0 10px;
  width: auto
}

.tags_input .el-input {
  width: auto
}

.cp-page {
  height: 100%;
  background-color: #fff;
  padding: 24px;
  overflow: auto
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.tags_input {
  width: auto;
  padding: 0px 7px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.tags_input:hover {
  border: 1px solid #1989fa;
}
</style>

