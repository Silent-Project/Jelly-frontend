import React from 'react'
import './SectionII.css'
import AdminFrame from '../../components/adminFrame/AdminFrame';
// import SectionIIs from './sectionIIs.json'
import Button from '../../components/button/Button'
import pen from '../../assets/images/pen.png'
import {BsArrowRight } from 'react-icons/bs';
import { CloudArrowUp } from 'phosphor-react';


function SectionII() {
    return (
        <div>
           <AdminFrame currentPage='sectionII'>
                <div className='sectionII'>
                    <header className='sectionII-header'>
                        <h1>Section II</h1>

                        <button type='file' 
                            style={{ 
                                cursor: 'pointer', 
                                background: " rgb(53, 112, 236)", 
                                height: '3.5rem', 
                                width: '13rem', 
                                float: "right", 
                                border: 'none',
                                color: 'white',
                                borderRadius:'15px'
                            }}>

                            <label id='label'>
                                <input  type="file" style={{  
                                    width: '1rem' 
                                }} />

                                <span style={{
                                    display: 'flex',
                                    gap:'5px', 
                                    alignItems: "center", 
                                    justifyContent: 'center', 
                                    width: '100%' 
                                }}>                           
                                    <CloudArrowUp size={18} />  Upload
                                </span>
                            </label>

                        </button>
                    </header>

                    <section className='sectionII-container'>
                        <div className='sectionII-add-image'>
                                <Button type={'submit'} content={'+'} style={{ backgroundColor: 'white', color:'black', width: '35px', height: '70px', fontSize: '2.0rem' }} />
                                <p> Add Image</p>
                        </div>

                        <div className='upload-main-image-sectionII'>

                            <input type="file" name='img' />
                            <label htmlFor="file">
                                <img src={pen} alt="product" style={{
                                    width: '50px',
                                    height: '40px',
                                    float: 'right',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    backgroundColor: '#FFFFFF',
                                    boxShadow: '0px 0.8718905448913574px 15.694029808044434px 0px #00000040',
                                    objectFit: 'contain'
                                }} />
                            </label>
                            {
                                <h1 className='umi-sec'>Upload Main <br /> Image</h1>
                            }
                        </div>


                    </section>

                    <div className='sectionII-next'>
                        <p> Next</p>
                        <BsArrowRight size={30} />
                    </div>

                </div>

            </AdminFrame>
        </div>
    )
}

export default SectionII