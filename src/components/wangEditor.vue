<template>
    <div id="wangEditor">
        <div ref="editorElem" style="text-align:left;"></div>
    </div>
</template>
<script>
import E from "wangeditor";
import createFormula from "./kityformula";
export default {
    name: "wangEditor",
    data() {
        return {
            editor: null,
            editorContent: ''
        }
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    props: ['catchData'], // 接收父组件的方法
    mounted() {
        // eslint-disable-next-line no-unused-vars
        const { $, PanelMenu, Panel} = E
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.config.onchange = html => {
            this.editorContent = html;
            this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
        };
        this.editor.config.showLinkImg = false
        this.editor.config.focus = true
        //粘贴来的内容过滤图片
        this.editor.config.pasteIgnoreImg = true
        this.editor.config.showFullScreen = false
        class Formula extends PanelMenu {
            // 公式输入插件
            constructor(editors) {
                const $elem = E.$(
                    `<div class="w-e-menu"><ul class="icon-sigma"></ul></div>`
                );
                super($elem, editors);
            }
            // 菜单点击事件
            clickHandler() {
                // 做任何你想做的事情
                // 可参考【常用 API】文档，来操作编辑器
                const conf = createFormula(this.editor);
                const panel = new Panel(this, conf);
                panel.create();
            }

            // tryChangeActive() {}
        }
        // 注册菜单
        // 菜单 key ，各个菜单不能重复
        this.editor.menus.extend("formulaKey", Formula);
        this.editor.config.menus = [
            // 菜单配置
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo',// 重复
            'formulaKey'
        ];

        this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024
        //限制一次最多上传 1 张图片
        this.editor.config.uploadImgMaxLength = 1
        this.editor.config.customUploadImg = function (files, insert) {
            // files 是 input 中选中的文件列表
            // insert 是获取图片 url 后，插入到编辑器的方法
            // 因为file是个FormData格式的对象所以可以直接通过接口开始上传，不需要做多余操作
            //虽然文档说是FormData格式，但是我实际使用需要以下操作
            console.log(files,11111)
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    insert(evt.target.result)
                }
                reader.readAsDataURL(files[0]);
            }
            // let formData = new FormData();
            // formData.append('file', files[0]);
            //
            // let config = {
            //     //添加请求头
            //     headers: {"Content-Type": "multipart/form-data"},
            // };
            // axios
            //     .post(formData, config)
            //     .then(res => {
            //         // todo 图片上传如何存储,具体要看上传接口返回的结果
            //         insert(res.data)
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //         console.log("获取信息失败");
            //     });
            // insert(imgUrl)

        }
        //自定义错误提示
        this.editor.config.customAlert = function (info) {
            console.log(info)
        }
        if (!this.editorContent) {
            console.log(this.editorContent)
        }

        this.editor.create(); // 创建富文本实例
    }
}
</script>
<style lang="scss">
    .icon-sigma{
        width: 40px;
        height: 40px;
        background: url("../assets/sigma.png") no-repeat center;
    }
</style>
