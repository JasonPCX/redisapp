import React, { useEffect, useState } from "react";
import { Image, ListGroup, Spinner } from "react-bootstrap";

const SearchCar = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const q = new URLSearchParams({ q: query });

      const res = await fetch(`/api/searchCars?${q}`);

      const result = await res.json();

      console.log(result);
      setHits(result["cars"]);
      setIsLoading(false);
    };

    if (query.length > 2) {
      search();
    } else {
      setHits([]);
    }
  }, [query]);

  async function handleChange(event) {
    setQuery(event.target.value);
  }

  function renderHits() {
    return hits.map((hit) => (
      <ListGroup.Item key={hit.entityKey} as='li' className='d-flex justify-content-between align-items-center'>
        <Image roundedCircle src={hit.image} height={40} width={40} alt='car img' className='ms-2' />
        <div className='ms-2 me-auto'>
          <div>
            <div className='fw-bold'>{hit.make}</div>
            {hit.model}
          </div>
        </div>
      </ListGroup.Item>
    ));
  }

  return (
    <>
      <h2>Search cars</h2>
      <div className='mb-3'>
        <input
          type='text'
          name='search'
          id='search'
          className='form-control'
          placeholder='Type to search'
          value={query}
          onChange={handleChange}
        />
      </div>

      <h5 className='text-muted'>{hits.length} coincidences found</h5>

      {isLoading ? (
        <Spinner animation='grow' className='mb-2'></Spinner>
      ) : (
        <ListGroup as='ul' numbered>
          {renderHits()}
        </ListGroup>
      )}
    </>
  );
};

export default SearchCar;
