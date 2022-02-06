import type { GetStaticProps, GetStaticPropsContext, NextPage, PreviewData } from 'next'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { HotelType, Props } from '../../data/types';
import Hotel from '../../components/Hotels';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { dateDiffInDays, isDateBefore } from '../../utiles/shared';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('https://run.mocky.io/v3/f9cde625-a2c6-46cc-b5c0-44e8395fea13')
    let hotels = await response.json()
    return {
        props: {
            hotels
        }
    }
}



const Hotels: NextPage<Props> = ({ hotels }) => {
    const router = useRouter()
    const [availableHotels, setAvailableHotels] = useState(hotels);
    const [filteredHotels, setHotels] = useState(hotels);


    const [totalNights, setTotalNights] = useState(0);
    const [sortBy, setSort] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(35);
    const [hasData, setHasData] = useState(false);

    const filterHotelsByDates = () => {
        let startDate: string | Date = router.query.startDate as string
        let endDate: string | Date = router.query.endDate as string
        if (!startDate || !endDate) return router.push('/')
        startDate = new Date(+startDate)
        endDate = new Date(+endDate)
        setTotalNights(dateDiffInDays(startDate, endDate))
        const availableHotels = hotels.filter(hotel => {
            const availableOn = new Date(hotel.available_on)
            return isDateBefore(startDate as Date, availableOn, true) && isDateBefore(availableOn, endDate as Date, true)
        })
        setHasData(!!availableHotels.length)
        setAvailableHotels(availableHotels)
        setHotels(availableHotels)
    }


    const onSetSortByName = () => {
        setSort("byName")
        const sortByName = (a: HotelType, b: HotelType) => {
            var nameA = a.name.toUpperCase()
            var nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
        setHotels(availableHotels.sort(sortByName))
        setHotels(filteredHotels.sort(sortByName))
    }

    const onSetSortByPrice = () => {
        setSort("byPrice")
        const sortByPrice = (a: HotelType, b: HotelType) => +a.price - +b.price
        setHotels(availableHotels.sort(sortByPrice))
        setHotels(filteredHotels.sort(sortByPrice))
    }

    const onSearchByName: ChangeEventHandler<HTMLInputElement> = (e) => {
        const name = (e.target as HTMLInputElement).value.trim().toLowerCase()
        setName(name)
        setPrice(35)
        if (!name) {
            setHotels(availableHotels)
            return
        }
        setHotels(availableHotels.filter(h =>
            h.name.toLowerCase().includes(name)
        ))
    }

    const onFilterByPrice: ChangeEventHandler<HTMLInputElement> = (e) => {
        const price = (+(e.target as HTMLInputElement).value)
        setPrice(price)
        setHotels(availableHotels.filter(h => {
            return price <= +h.price && (name ? h.name.toLowerCase().includes(name) : true)
        }))
    }

    useEffect(() => {
        filterHotelsByDates()
        console.log('Filter by Dates')
    }, []);

    return (
        <div className='card mt-4'>
            <div className="card-header">
                <h4>
                    <b>Search Result</b>
                </h4>
            </div>
            <div className="card-body">
                {hasData || (filteredHotels && filteredHotels.length) ?
                    <>
                        {/* Sorting */}
                        <div className="row mt-4">
                            <div className="col-12 col-sm-8 ml-auto d-flex justify-content-between">
                                <h5 className='m-0 py-3'>Total nights: {totalNights}</h5>
                                <div className="d-flex align-items-center justify-content-end">
                                    <button type="button" disabled={!filteredHotels.length} className={`btn btn-outline-primary mr-3 ${sortBy == 'byName' && 'active'}`} onClick={onSetSortByName}>Sort By Name</button>
                                    <button type="button" disabled={!filteredHotels.length} className={`btn btn-outline-primary ${sortBy == 'byPrice' && 'active'}`} onClick={onSetSortByPrice}>Sort By Price</button>
                                </div>
                            </div>
                        </div>
                        {/* Sorting */}

                        <div className="row mt-2">
                            <div className="col-12 col-sm-4 d-flex flex-column">
                                {/* Search by Name */}
                                <div className="input-group mb-3">
                                    <span className="input-group-text rounded-left">@</span>
                                    <input type="text" className="form-control input-placeholder rounded-right" placeholder="Search by Name" onInput={onSearchByName} />
                                </div>
                                {/* Search by Name */}

                                {/* Filter by Price */}
                                <div>
                                    <label htmlFor="price">Price Filter</label>
                                    <div className="form-group mb-0">
                                        <input type="range" value={price} className="form-control-range w-100" min={35} max={500} id="price" onChange={onFilterByPrice} />
                                    </div>
                                    <h2>
                                        <span className="badge p-0 text-dark">{price}$</span>
                                    </h2>
                                </div>
                                {/* ./Filter by Price */}
                            </div>
                            <div className="col-12 col-sm-8">
                                {filteredHotels.length
                                    ?
                                    <Hotel hotels={filteredHotels} className="mt-4 mt-sm-0" />
                                    :
                                    <div className='d-flex align-items-center flex-column'>
                                        <Image
                                            src="/nodata.svg"
                                            width={250}
                                            height={250}
                                        />

                                        <h2 className='my-3'>No Data Found</h2>
                                        <p className="text-muted">Update filter criteria to find other result</p>
                                    </div>

                                }
                            </div>
                        </div>
                    </>
                    :
                    // This to handel no results state
                    <div className='d-flex align-items-center flex-column'>
                        <Image
                            src="/nodata.svg"
                            width={250}
                            height={250}
                        />

                        <h2 className='my-3'> No Data Found</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default Hotels
