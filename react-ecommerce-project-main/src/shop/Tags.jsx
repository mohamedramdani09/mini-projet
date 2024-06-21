import React from 'react'

const title = "Most Popular Tags";

const tagsList = [ { link: "#", text: "shoes", }, 
                   { link: "#", text: "shirts", }, 
                   { link: "#", text: "pants", }, 
                   { link: "#", text: "jackets", }, 
                   { link: "#", text: "sweaters", }, 
                   { link: "#", text: "hoodies", }, 
                   { link: "#", text: "jeans", }, 
                   { link: "#", text: "suits", }, 
                   { link: "#", text: "coats", }, 
];

const Tags = () => {
  return (
    <div className='widget widget-tags'>
        <div className='widget-header'>
            <h5 className='title'> {title} </h5>
        </div>
        <ul className='widget-wrapper'>
            {
                tagsList.map((val, i) => (
                    <li key={i}> <a href={val.link}> {val.text} </a> </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Tags