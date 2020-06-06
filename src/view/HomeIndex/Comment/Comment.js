/*eslint-disable*/
import React from 'react'
import style from "./Comment.module.less"
import { Comment, Avatar } from 'antd';
const ExampleComment = ({ children }) => (
    <Comment
        actions={[<span key="comment-nested-reply-to">几秒前</span>]}
        author={<a>Han Solo</a>}
        avatar={
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        }
        content={
            <p>
                We supply a series of design principles, practical
      </p>
        }
    >
        {children}
    </Comment>
);
const Comments = () => {
    return (
        <div className="comm">
            <ExampleComment>
                <ExampleComment>
                    <ExampleComment />
                </ExampleComment>
            </ExampleComment>
        </div>

    )
}
export default Comments
