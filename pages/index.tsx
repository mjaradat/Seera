import type { NextPage } from 'next'
import { useState } from 'react'
import DatePicker from 'react-datepicker';
import { DateErrorType, Props } from '../data/types';
import { isDateBefore, isValidDate } from '../utiles/shared';
import { useRouter } from 'next/router';
import "react-datepicker/dist/react-datepicker.css";


const Home: NextPage<Props> = ({ hotels }) => {
  const router = useRouter()
  const [filteredHotels, setHotels] = useState(hotels);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [startDateError, showStartDateError] = useState({ isValid: true, error: '' } as DateErrorType);
  const [endDateError, showEndDateError] = useState({ isValid: true, error: '' } as DateErrorType);

  const isValidDates = () => {
    let isValid = true
    showStartDateError({ isValid: true, error: '' })
    showEndDateError({ isValid: true, error: '' })

    // To check if the fields have values
    const isValidStartDate = isValidDate(startDate)
    const isValidEndDate = isValidDate(endDate)
    if (!isValidStartDate || !isValidEndDate) {
      !isValidStartDate && showStartDateError({ isValid: false, error: 'This field is required.' })
      !isValidEndDate && showEndDateError({ isValid: false, error: 'This field is required.' })
      return isValid = false
    }

    // This check to ensure that the entered dates are not in the past

    if (isDateBefore(startDate, new Date())) {
      showStartDateError({ isValid: false, error: 'The start date cannot be in the past' })
      isValid = false
    }
    if (isDateBefore(endDate, new Date())) {
      showEndDateError({ isValid: false, error: 'The end date cannot be in the past' })
      isValid = false
    }
    if (!isValid) return isValid

    // To check that the end date is not older than the start date
    if (isDateBefore(endDate, startDate)) {
      showEndDateError({ isValid: false, error: 'The end date cannot be older than the start date' })
      isValid = false
    }
    return isValid
  }

  const searchByDates = () => {
    if (!isValidDates()) return

    router.push({
      pathname: '/hotels',
      query: { startDate: startDate.getTime(), endDate: endDate.getTime() }
    })
  }

  return (
    // TODO: This can be a card component
    <div className='card mt-4'>
      <div className="card-header">
        <h4>
          <b>Search hotels</b>
        </h4>
        <p className='text-muted mt-2 mb-0'>
          Enter your dates to see the latest prices and deals for all hotels
        </p>
      </div>
      <div className="card-body">
        {/* Search Hotels */}
        <div className="row">


          <div className='col-12 col-sm-4 my-sm-0 d-flex flex-column'>
            <label>To:</label>
            <div className="d-flex flex-nowrap input-group input-group-sm w-auto">
              <div>
                <DatePicker className={`form-control rounded-left ${!startDateError.isValid ? 'is-invalid' : ''}`} selected={startDate} onChange={(date: Date) => setStartDate(date)} />
              </div>
              <span className='input-group-text rounded-right'>@</span>
            </div>
            <div className={`invalid-feedback w-100 ${!startDateError.isValid ? 'd-block' : ''}`}>
              {startDateError.error}
            </div>
          </div>

          <div className='col-12 col-sm-4 my-sm-0 d-flex flex-column'>
            <label>From:</label>
            <div className="d-flex flex-nowrap input-group input-group-sm w-auto">
              <div>
                <DatePicker className={`form-control rounded-left ${!endDateError.isValid ? 'is-invalid' : ''}`} selected={endDate} onChange={(date: Date) => setendDate(date)} />
              </div>
              <span className='input-group-text rounded-right'>@</span>
            </div>
            <div className={`invalid-feedback w-100 ${!endDateError.isValid ? 'd-block' : ''}`}>
              {endDateError.error}
            </div>
          </div>

          <div className='col-12 col-sm-4 my-sm-0 d-flex align-items-center flex-column'>
            <label>&nbsp;</label>
            <button type='button' className='btn btn-outline-primary pt-1 px-5' onClick={searchByDates}>Search</button>
          </div>
        </div>
        {/* ./Search Hotels */}
      </div>
    </div >
  )
}

export default Home
