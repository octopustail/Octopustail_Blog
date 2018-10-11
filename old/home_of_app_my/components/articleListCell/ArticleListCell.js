import React, {Component} from 'react';

export const ArticleListCell = (props) =>(
    /*TODO:这里的push的内容是什么原理*/
    <div onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}}>
        <div>
            cover图片
        </div>
        <div>
            <p>{props.data.title}</p>
        </div>
        <div>
            <p>
                    <span>
                        {/*<img src={require('./calendar.png')} alt="发表日期"/>*/}
                        {props.data.time}
                    </span>
                /*TODO:这里的props的逻辑好像还没有实现*/
                <span>
                        {/*<img src={require('./views.png')} alt="阅读数"/>*/}
                    {props.data.viewCount}
                    </span>
                <span>
                        {/*<img src={require('./comments.png')} alt="评论数"/>*/}
                    {props.data.commentCount}
                    </span>
            </p>
            <span className={style.lastSpan}>
                    阅文 <span>...</span>
                </span>
        </div>

    </div>
);