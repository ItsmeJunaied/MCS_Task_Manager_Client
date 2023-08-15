import { faCalendarDays, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import MyMap from '../pages/MyMap/MyMap';

const FilteredDataDrawer = ({ item, getcomment, user }) => {
    const filteredComments = Array.isArray(getcomment) ? getcomment.filter(comment => comment.itemId === item._id) : [];
    return (
        <div>
            <div className="drawer drawer-end">
                <input
                    id={`my-drawer-${item._id}`}
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">

                </div>
                <div className="drawer-side">
                    <label
                        htmlFor={`my-drawer-${item._id}`}
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">

                        <img src={item.image} alt="" />
                        <h2 className=' text-3xl font-bold mt-5'>{item.ItemName}</h2>
                        <p className=' mt-3 mb-3 text-xl text-slate-500'>{item.Description}</p>
                        <h2>Details</h2>
                        <p className=' text-md mt-2 mb-2'><FontAwesomeIcon className=' text-yellow-500 mr-3' icon={faMapMarkerAlt}></FontAwesomeIcon> {item.location}</p>
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
                                        <div>
                                            {comment.feedback && (
                                                <div className="chat-bubble bg-[#76965D]">Admin: {comment.feedback}</div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FilteredDataDrawer;