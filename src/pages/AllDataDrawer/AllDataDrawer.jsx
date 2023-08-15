import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarDays, faClock } from '@fortawesome/free-solid-svg-icons';
import MyMap from '../MyMap/MyMap';
import { useState } from 'react';

const AllDataDrawer = ({ item, getcomment, user }) => {
    const filteredComments = Array.isArray(getcomment) ? getcomment.filter(comment => comment.itemId === item._id) : [];

    return (
        <div className="details-container">
            <label
                htmlFor={`my-drawer-${item._id}`}
                className="drawer-button btn btn-[#76965D] bg-[#76965D] btn-sm inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg"
            >
                Details
            </label>
            <div className="drawer drawer-end">
                <input
                    id={`my-drawer-${item._id}`}
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content"></div>
                <div className="drawer-side">
                    <label htmlFor={`my-drawer-${item._id}`} className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        <div className="flex flex-col">
                            {/* Image */}
                            <div className="image-container">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="item-details p-4">
                                <h2 className="text-3xl font-bold">{item.ItemName}</h2>
                                <p className="mt-3 mb-6 text-xl text-slate-500">{item.Description}</p>
                                <div className="flex items-center mb-3">
                                    <FontAwesomeIcon className="text-yellow-500 mr-3" icon={faMapMarkerAlt} />
                                    <p className="text-md">{item.location}</p>
                                </div>
                                <MyMap location={item.location} />
                                <div className='flex items-center mt-4'>
                                    <div className='flex-shrink-0 mr-4'>
                                        <FontAwesomeIcon className='text-blue-700' icon={faCalendarDays} />
                                    </div>
                                    <div className='text-sm text-gray-600'>
                                        <p className='font-bold text-md'>{item.Date}</p>
                                        <p>{item.Time}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="comments p-4">
                                <h2 className="text-2xl font-extrabold mb-4">Comments</h2>
                                {
                                    filteredComments.map(comment => (
                                        <div key={comment._id} className="chat chat-start mb-3">
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <img src={comment.PosterImage} />
                                                </div>
                                            </div>
                                            
                                            <div className="chat-bubble">{comment.comment}</div>
                                            
                                            <div className='ml-32'>
                                                {comment.feedback && (
                                                    // <div className="chat-bubble bg-[#76965D]">Admin: {comment.feedback}</div>
                                                    <div className="chat chat-end ">
                                                        <div className="chat-image avatar">
                                                            <div className="w-10 rounded-full">
                                                                <img src={comment.PosterImage} />
                                                            </div>
                                                        </div>
                                                        <div className="chat-header">
                                                        Admin
                                                        </div>
                                                        <div className="chat-bubble bg-[#76965D]">{comment.feedback}</div>
                                                
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AllDataDrawer;
