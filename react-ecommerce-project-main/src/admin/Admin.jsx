import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './Admin.css'
import './../assets/css/bootstrap.min.css'
import Header from './component/Header'
import Sidebar from './component/Sidebar'

function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <Outlet/>
     </main>
    </div>
  )
}

export default Admin
