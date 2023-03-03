import React from 'react';

class ErrorForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render (){
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative" role="alert">
                {/* <strong className="font-bold">Error! </strong> */}
                <span className="block sm:inline">{this.props.content}</span>
            </div>
        );
    }
}
export default ErrorForm
