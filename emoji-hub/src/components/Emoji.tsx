import React from 'react';

function Emoji(props:any) {
    
    const htmlCode =props.emoji.htmlCode
    const txt = document.createElement("span")
    txt.innerHTML=htmlCode
    const emoji = txt.innerHTML



    return (

        <div className='emoji-card'>
            <div style={{fontSize : "100px"}}>
                {emoji}
            </div>
            <div style={{padding : "5px"}} >
            <h5>{props.emoji.name}</h5>

            <p style={{fontSize: "large", margin: 0}}> <b>Category : </b> {props.emoji.category} </p>
            <p style={{fontSize: "large", margin: 0}}> <b>HTML Entity : </b> {props.emoji.htmlCode} </p>
            <p style={{fontSize: "large", margin: 0}}> <b>UniCode : </b> {props.emoji.unicode} </p>
            </div>
        </div>

    );
}

export default Emoji;