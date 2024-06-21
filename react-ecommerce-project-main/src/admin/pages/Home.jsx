import React, { useEffect, useState } from 'react';
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck }
 from 'react-icons/bs'
import './../Admin.css'
import { fetchStatistics } from '../apiFunction/apiService';

const Home = () => {
  const [statistics, setStatistics] = useState({
    users: 0,
    category: 0,
    product: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const data = await fetchStatistics();
        setStatistics(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getStatistics();
  }, []);

  if (loading) {
    return <div className='text-black'>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <>
    <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

<div className='main-cards animated fadeInUp'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{statistics.users}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{statistics.product}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{statistics.category}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Orders</h3>
                    <BsListCheck className='card_icon'/>
                </div>
                <h1>{statistics.orders}</h1>
            </div>
        </div>
    </>

)
}
export default Home