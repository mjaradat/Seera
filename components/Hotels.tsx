import { NextPage } from 'next';
import { HotelType, Props } from '../data/types';


const Hotel: NextPage<Props> = ({ hotels, className }) => {
    return (
        <div className={className || ''}>
            {
                hotels && hotels.map((hotel: HotelType, idx) => {
                    return (
                        // <div key={`${hotel.price}-${idx}`}>
                        //     {hotel.name}
                        // </div>
                        <div className='card mb-3' key={`${hotel.name.replaceAll(' ', '')}-${idx}`} >
                            <div className='card-body'>
                                <div className="d-flex justify-content-between">
                                    <h5 className='card-title m-0 p-0'>
                                        {hotel.name}
                                    </h5>
                                    <h3 className='m-0 p-0'><span className="badge badge-info d-block">{hotel.price}$</span></h3>
                                </div>
                                <p className='my-3'><span className="text-muted">City:</span> <b>{hotel.city}</b></p>
                                <p className='my-3'><span className="text-muted">Available On:</span> <b>{hotel.available_on}</b></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Hotel;