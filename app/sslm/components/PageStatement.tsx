import React from 'react';

interface PageStatementProps {
    header: string;
    context: string;
}

const PageStatement: React.FC<PageStatementProps> = ({ header, context }) => {
    return (
        <div className={'flex flex-col'}>
            <div className={'font-bold'}>{header}</div>
            <div className={'text-xs'}>{context}</div>
            <hr className={'my-2'} />
        </div>
    );
};

export default PageStatement;
