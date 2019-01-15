import React from "react";
import Spinner from "./presenter";

const Container = (props, context) => {
    return (
        <Spinner 
            visible={props.visible}
            children={props.children}
            size={props.size}
        />
    )
}

export default Container;