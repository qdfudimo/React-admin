import React, { Component, Fragment } from 'react'
import style from '../Editor//editor.module.less'
import { Card, Button } from 'antd';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { DiffOutlined } from '@ant-design/icons';
export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: "",
            value: ""
        }
    }
    click = () => {
        import('showdown').then(showdown => {
            const converter = new showdown.Converter()
            this.setState({
                html: converter.makeHtml(this.state.value)
            })
        })
    }
    handleChange = (value) => {
        this.setState({
            value: value
        })

    }
    render() {
        return (
            <Fragment>
                <div className={style.title}>
                    <span>react-simplemde-editor&nbsp;&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://github.com/Ionaru/easy-markdown-editor#configuration">Simply encapsulated in Vue. 相关文章</a></span>
                </div>
                <Card style={{ paddingTop: "10px", marginTop: "20px" }} title="Markdown">
                    <SimpleMDE
                        id="your-custom-id"
                        value={this.state.value}
                        options={{
                            autofocus: true,
                            spellChecker: false,
                            // autosave: {
                            //     enabled: true,
                            //     delay: 5000,
                            //     uniqueId: 'article_content',
                            //   },
                            toolbar: [
                                'bold',
                                'italic',
                                'heading',
                                '|',
                                'quote',
                                'code',
                                'table',
                                'horizontal-rule',
                                'unordered-list',
                                'ordered-list',
                                '|',
                                'link',
                                'image',
                                '|',
                                'side-by-side',
                                'fullscreen',
                                '|',
                                'guide'
                            ],
                            placeholder: "Type here...",
                            // previewRender: this.renderMarkdown
                        }}
                        onChange={this.handleChange}
                    />
                    <Button style={{borderRadius:"10px"}} danger type="primary" icon={<DiffOutlined />} onClick={this.click}>输出Html</Button>
                    <div dangerouslySetInnerHTML={{ __html: this.state.html }} style={{padding:"10px"}}></div>
                </Card>
            </Fragment>
        )
    }
}