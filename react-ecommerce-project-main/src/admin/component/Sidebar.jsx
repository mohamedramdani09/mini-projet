import React from 'react'
import { Link } from 'react-router-dom'
import 
{ BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsBoxArrowRight, BsListCheck }
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list position-relative'>
            <Link to="/admin/" className='Link'>
                <li className='sidebar-list-item'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </li>
            </Link>
            <Link to="/admin/users" className='Link'>
                <li className='sidebar-list-item'>
                    <BsPeopleFill className='icon'/> Users
                </li>
            </Link>
            <Link to="/admin/products" className='Link'>
                <li className='sidebar-list-item'>    
                    <BsFillArchiveFill className='icon'/> Products
                </li>
            </Link>
            <Link to="/admin/categories" className='Link'>
                <li className='sidebar-list-item'>
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </li>
            </Link>
            <Link to="/admin/orders" className='Link'>
                <li className='sidebar-list-item'>
                    <BsListCheck className='icon'/> Orders
                </li>
            </Link>
            {/* <Link to="/admin/logout" className='Link'>
                <li className='sidebar-list-item'>
                    <BsBoxArrowRight  className='icon'/> Logout
                </li>
            </Link> */}
        </ul>
    </aside>
  )
}

export default Sidebar

