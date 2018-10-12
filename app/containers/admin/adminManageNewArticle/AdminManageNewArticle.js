import PureRenderMixin from 'react-addons-pure-render-mixin'
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import style from './style.css'

import remark from 'remark';
import reactRenderer from 'remark-react';
import {Input, Select, Button, Modal} from 'antd';
import dateFormat from 'dateformat'

import {actions} from '../../../reducers/adminManageNewArticle';
import {actions as TagsAction} from '../../../reducers/adminManageTags'

const {update_title, update_content, update_tag, save_article} = actions;
const {get_all_tags} = TagsAction;
let Option = Select.Option

class AdminManageNewArticle extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            options: [],
            modalVisible: false
        }
    }
    titleOnChange(e){
        this.props.updateTitle(e.target.value)
    }
    onChanges(e){
        this.props.updateContent(e.target.value)
    }
    selectTags(value){
        this.props.updateTag(value)
    }
    publishArticle(){
        let articleData ={}
        articleData.title =this.props.title;
        articleData.content =this.props.content;
        articleData.tags = this.props.tags;
        articleData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        articleData.isPublish = true;
        this.props.saveArticle(articleData);

    }
    saveArticle(){
        let articleData ={}
        articleData.title =this.props.title;
        articleData.content =this.props.content;
        articleData.tags = this.props.tags;
        articleData.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
        articleData.isPublish = false;
        this.props.saveArticle(articleData);
    }
    preView(){
        this.setState({
            modalVisible:true
        })
    }


    render() {
        return (
            <div>
                <h2>发文</h2>
                <div className={style.container}>
                    <span className={style.subTitle}>标题</span>
                    <Input type="text"
                           value={this.props.title}
                           placeholder={'请输入文章标题'}
                           className={style.titleInput}
                           onChange={this.titleOnChange.bind(this)}
                    />
                    <span className={style.subTitle}>标题</span>
                    <textarea
                        value={this.props.content}
                        className={style.textArea}
                        onChange={this.onChanges.bind(this)}
                    />
                    <span className={style.subTitle}>标题</span>
                    <Select className={style.titleInput}
                            mode="multiple"
                            placeHolder="请选择分类"
                            onChange={this.selectTags.bind(this)}
                            value={this.props.tags}
                    >
                        {this.props.tagsBase.map((item) => (
                            <Option key={item}>{item}</Option>
                        ))}
                    </Select>
                    <div className={style.bottomContainer}>
                        <Button type="primary" onClick={this.publishArticle.bind(this)}
                                className={style.buttonStyle}>发布</Button>
                        <Button type="primary" onClick={this.saveArticle.bind(this)}
                                className={style.buttonStyle}>保存</Button>
                        <Button type="primary" onClick={this.preView.bind(this)}
                                className={style.buttonStyle}>预览</Button>
                    </div>
                </div>
            </div>
        )
    }
}

AdminManageNewArticle.defaultProps = {
    title: '',
    content: '',
    tags: [],
    tagsBase: []
};

AdminManageNewArticle.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.array,
    tagsBase: PropTypes.array,
}

function mapStateToProps(state) {
    let {title, content, tags} = state.admin.newArticle;
    let tempArr = state.admin.tags;
    /*TODO: 这里的tagBase去掉了首页 要知道tagBase是用在哪里的*/
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] === '首页' || tempArr[i] === '') {
            tempArr.splice(i, 1);
        }
    }
    return {
        title,
        content,
        tags,
        tagsBase: tempArr
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateTitle: bindActionCreators(update_title, dispatch),
        updateContent: bindActionCreators(update_content, dispatch),
        updateTag: bindActionCreators(update_tag, dispatch),
        saveArticle: bindActionCreators(save_article, dispatch),
        getAllTags: bindActionCreators(get_all_tags, dispatch),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManageNewArticle);

