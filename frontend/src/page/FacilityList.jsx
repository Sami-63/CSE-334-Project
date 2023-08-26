import { useState, useEffect } from "react";
import { Container, Row, Alert } from "react-bootstrap";

import Loader from "../conponents/Loader";
import FilterBox from "../conponents/FilterBox";
import { useParams } from "react-router-dom";
import {
  FilterFacility,
  GetFacilityByCategoty,
} from "../actions/facilityActions";
import FacilityCard from "../conponents/FacilityCard";
import FacilityFilterBox from "../conponents/FacilityFilterBox";

const FacilityList = () => {
  const { getFacility, isLoading, error } = GetFacilityByCategoty();
  const [facilities, setFacilities] = useState([]);

  const { category } = useParams();

  const {
    filter,
    isLoading: searchLoading,
    error: searchError,
  } = FilterFacility();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getFacility(category);
        setFacilities(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();

    console.log("facilities -> ", facilities);
  }, []);

  return (
    <Container className='mt-5'>
      <Row>
        <h2 className='text-center mb-4'>{category}</h2>
        {/* <FilterBox setFacilities={setFacilities} filter={filter} /> */}
        <FacilityFilterBox filter={filter} setFacilities={setFacilities} />
        {error && <Alert variant='danger'>{error}</Alert>}
        {searchError && <Alert variant='danger'>{searchError}</Alert>}
        {(isLoading || searchLoading) && <Loader />}

        {facilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </Row>
    </Container>
  );
};

export default FacilityList;
