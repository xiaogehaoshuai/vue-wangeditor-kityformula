<template>
    <div style="width: 800px;margin: auto">
        <wang-editor :catchData="catchData"></wang-editor>
    </div>
</template>
<script>
import WangEditor from "../components/wangEditor";
export default {
    name: "edit",
    components: {WangEditor},
    data() {
        return {
            editor: null,
            editorContent: ''
        };
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    mounted() {
    },
    methods:{
        catchData(val){
            console.log(val,3222)
        }
    }
}
</script>
