/*eslint-disable*/
import React, { Fragment } from 'react'
import { Card, Button} from 'antd';
const componentName =() => {
    return (
        <Fragment>
        <Card size="small" title="图片上传">
            <input type="file" />
        </Card>
    </Fragment>
    )
}
export default componentName