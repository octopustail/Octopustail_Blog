import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Tag, Input, Tooltip, Botton} from 'antd'
import style from './style.css'

import {actions} from '../../../reducers/adminManageTags'

const {get_all_tags, delete_tag, add_tag} = actions


class AdminManagerTags extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            tags: ['首页', 'HTML', 'CSS', 'JAVASCRIPT'],
            inputVisible: false,
            inputValue: '',
        }
    }

    handleClose(tag) {
        this.props.deleteTag(tag)
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleInputConfirm() {

    }

    handleInputSubmit() {
        this.props.add_tag(this.state.inputValue);
        this.setState({
            inputVisible: false,
            inputValue: ''
        })
    }

    showInput() {
        /*这里setState还带了回调函数*/
        this.setState({inputVisible: true}, () => this.input.focus())
    }


    saveInputRef = input => this.input = input

    render() {
        const {inputVisible, inputValue} = this.state
        const {tags} = this.props;
        return (
            <div>
                <h2 className={style.titleStyle}>标签管理</h2>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20
                    const tagElem = (
                        <Tag
                            className={style.tagStyle} key={index} closable={index !== 0}
                            afterClose={this.handleClose(tag)}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    )
                    return isLongTag ? <Tooltip key={tag} title={tag}>{tagElem}</Tooltip> : tagElem

                })}

                /*这个地方用inputVisible判断显示输入框还是按钮的操作学习了*/
                {inputVisible && (
                    <Input
                        className={style.tagStyle}
                        ref={this.saveInputRef}
                        type="text"
                        style={{wight: 108}}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputSubmit}
                    />
                )}
                {!inputVisible &&
                <Button className={style.tagStyle} size="small" type="dashed" onClick={this.showInput}>+ New
                    Tag</Button>}
            </div>
        )
    }

    componentDidMount() {
        this.props.getAllTags()
    }
}

function mapStateToProps(state) {
    return {
        tags: state.admin.tags,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllTags: bindActionCreators(get_all_tags, dispatch),
        deleteTag: bindActionCreators(delete_tag, dispatch),
        addTag: bindActionCreators(add_tag, dispatch)
    }
}

/*TODO: 完成Component部分*/
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManagerTags);
