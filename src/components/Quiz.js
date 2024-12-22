import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";




function Quiz(){

    const url = "https://opentdb.com/api.php?amount=10&category=17#";
    const [post, setPost] = useState([])
    const [refresh, setRefresh] = useState(false)
    

    useEffect(() => {
        axios({
            url:url,
            method:"GET",        
            })
            .then((res) => {setPost(res.data.results)})

},[])
let correct = 0
    let arr = []
    post.map(element => {
        element.incorrect_answers.push(element.correct_answer)
        arr = [...arr, element.incorrect_answers.sort(() => Math.random() - 0.5)]
       
        
})

function validate(question, index, answer) {
    if (answer == post[index].correct_answer) {
        console.log("correct")
        correct += 1
        const myDiv = document.getElementById(question)
        Array.from(myDiv.children).forEach((element) => {
            element.disabled = true;
          });
    }
    else {
        console.log("wrong")
        const myDiv = document.getElementById(question)
        Array.from(myDiv.children).forEach((element) => {
            element.disabled = true;
          });
    }
}


    return(
        <div>
        <h1 className="title">Welcome to Trivia</h1>
        
            {post.map((po,index) => 
                <div id={po.question}>
                <h2>{po.question}</h2>
                
                {/*iterate over answers */}
                {arr[index].map(ans => 
                
                <button onClick={() => validate(po.question,index,ans)}>{ans}</button>
                
                )}
                
                
                </div>
               
            )}
            <Popup trigger={
            <button className="submit-button">Submit</button>
            } modal nested>
            { close => (
            <div className="report">
            <p>Correct:{correct}/{arr.length}</p>
            <button onClick={() => {close(); window.location.reload() }}>try again</button>
            </div>
            )
            }
            </Popup>
        </div>
    )
}

export default Quiz;