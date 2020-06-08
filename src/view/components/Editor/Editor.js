import React, { Component, Fragment } from 'react'
import style from './editor.module.less'
import { Card } from 'antd';
import E from 'wangeditor'
export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent: "<h1>Welcome to the wangeditor demo!</h1>"
        }
        this.editor=null
    }
    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        this.editor = new E(elemMenu, elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.editor.customConfig.onchange = html => {
            this.setState({
                editorContent: this.editor.txt.html()
            })
        }
        // editor.customConfig.onblur  = function () {
        //     console.log(editor.selection.getSelectionStartElem()[0]);
        // }
        this.editor.customConfig.uploadImgShowBase64 = true
        this.editor.create()
        this.editor.txt.html(this.state.editorContent)
    }
    componentWillUnmount() {
        this.editor=null;
    }
    render() {
        return (
            <Fragment>
                <div className={style.title}>
                    <span>富文本编辑器参考&nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.kancloud.cn/wangfupeng/wangeditor3/332599">wangEditor —— 轻量级 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。</a></span>
                </div>
                <Card style={{ paddingTop: "10px", marginTop: "20px" }} title="富文本编辑器">
                    {/* 将生成编辑器 */}
                    <div ref="editorElemMenu"
                        style={{ border: "1px solid #ccc" ,flexWrap:"wrap"}}>
                    </div>
                    <div
                        style={{
                            paddingLeft: "10px",
                            height: 400,
                            border: "1px solid #ccc",
                            borderTop: "none"
                        }}
                        ref="editorElemBody">
                    </div>
                    <div className={style.content} dangerouslySetInnerHTML={{__html:this.state.editorContent}}>
                    </div>
                </Card>
            </Fragment>
        )
    }
}