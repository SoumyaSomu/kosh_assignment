import React from 'react';
import '../App.css';

export default function User(props) {
    return(
        <div className="card bg- mb-3">
            <div className="card-body inline-flex">
                <div>
                    <img className="card-image" src={props.image_url} alt=""/>
                </div>
                <div className="margin-left-15">
                    <h5 className="card-title">{ props.name }</h5>
                    <p className="card-text">Category : { props.category}</p>
                    <p className="card-text">Date : { props.date_submitted.split(' ')[0]}</p>
                    <p className="card-text">Age : { props.age}</p>
                </div>
            </div>
        </div>
    );
}