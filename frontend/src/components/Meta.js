import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={`${description}`} />
            <meta name='keywords' content={`${keywords}`} />
        </Helmet>
    )
}

Meta.defautProps = {
    title : 'Welcome To Proshop',
    description: 'We sell the best product for the cheap',
    keywords: 'electronics, buy electronics, cheap electronics',
}

export default Meta
