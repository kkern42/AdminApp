
import React from 'react';
import './App.css';


const Display = (props) => {
    return (
        <div className='container'>
            <section className="add-item" style={{ padding: "30px 18px", height: "250px" }}>
                <form>
                    <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>Add Students{" & "}Teachers</h2>
                    <input type="text" name="username" placeholder="Name of Group" onChange={props.handleChange} value={props.username} />
                    <input type="text" name="student" placeholder="Students/Teachers Name" onChange={props.handleChange} value={props.student} />
                    <button style={{ fontSize: "15px" }} onClick={props.handleSubmit}>Add Student</button>
                </form>
            </section>
            <section className='display-item'>
                <div className="wrapper" style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}>
                    {props.items.map((item, index) => {
                        return (
                            <ul key={"first" + index}>
                                {
                                    ((props.filter === item.name) || props.all) && [
                                        <li key={item.id}>
                                            {/* add 's class */}
                                            <h3>{item.title}</h3>
                                            {item.kids.map((x, index) => {
                                                return (
                                                    <p key={"second" + index}>{x.student}
                                                        <button onClick={() => props.removeItem(`/${item.title}/${x.id}`)}>Remove</button>
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


export default Display;