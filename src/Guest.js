import React from 'react';
import './App.css';


const Guest = (props) => {
    return (
        <div className='container'>
            <section className='display-item' style={{ width: "2000px", marginLeft: "125px" }}>
                <div className="wrapper" style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}>
                    {props.items.map((item) => {
                        return (
                            <ul>
                                {
                                    ((props.filter === item.name) || props.all) && [
                                        <li key={item.id}>
                                            <h3>{item.title}</h3>
                                            {item.kids.map(x => {
                                                return (
                                                    <p >{x.student}
                                                    </p>
                                                )
                                            })}
                                        </li>
                                    ]
                                }
                            </ul>
                        )
                    })}
                </div>
            </section>
        </div>
    );
}

export default Guest;