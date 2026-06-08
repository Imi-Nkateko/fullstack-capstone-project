import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';

function SearchPage() {
    // Task 1: Define state variables for the search query, age range, and search results.
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6); // Initialize with default intermediate value
    const [searchResults, setSearchResults] = useState([]);

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    useEffect(() => {
        // fetch all products on initial page load
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                console.log(url)
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);


    // Task 2. Fetch search results from the API based on user inputs.
    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: document.getElementById('categorySelect').value,
            condition: document.getElementById('conditionSelect').value,
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    const navigate = useNavigate();

    const goToDetailsPage = (productId) => {
        // Task 6. Enable navigation to the details page of a selected gift.
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="filter-section mb-3 p-3 border rounded bg-light">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">
                            {/* Task 3: Dynamically generate category and condition dropdown options.*/}
                            <div className="mb-2">
                                <label htmlFor="categorySelect" className="form-label font-weight-bold">Category</label>
                                <select id="categorySelect" className="form-control">
                                    <option value="">All</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="conditionSelect" className="form-label font-weight-bold">Condition</label>
                                <select id="conditionSelect" className="form-control">
                                    <option value="">All</option>
                                    {conditions.map(condition => (
                                        <option key={condition} value={condition}>{condition}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Task 4: Implement an age range slider and display the selected value. */}
                            <div className="mb-2">
                                <label htmlFor="ageRange" className="form-label font-weight-bold">Less than {ageRange} years</label>
                                <input
                                    type="range"
                                    className="form-range d-block w-100"
                                    id="ageRange"
                                    min="1"
                                    max="10"
                                    value={ageRange}
                                    onChange={e => setAgeRange(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Task 7: Add text input field for search criteria*/}
                    <div className="mb-3">
                        <label htmlFor="searchQueryInput" className="form-label font-weight-bold">Search By Name</label>
                        <input
                            id="searchQueryInput"
                            type="text"
                            className="form-control"
                            placeholder="Type product name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Task 8: Implement search button with onClick event to trigger search:*/}
                    <button className="btn btn-primary w-100 mb-4" onClick={handleSearch}>
                        Search
                    </button>

                    {/*Task 5: Display search results and handle empty results with a message. */}
                    <div className="search-results">
                        {searchResults.length > 0 ? (
                            searchResults.map(product => (
                                <div key={product.id} className="card mb-3 shadow-sm">
                                    {product.image && (
                                        <img src={`${urlConfig.backendUrl}${product.image}`} alt={product.name} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title font-weight-bold">{product.name}</h5>
                                        <p className="card-text text-muted">
                                            {product.description ? `${product.description.slice(0, 120)}...` : 'No description available.'}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-top-0">
                                        <button onClick={() => goToDetailsPage(product.id)} className="btn btn-outline-primary w-100">
                                            View More
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="alert alert-info text-center" role="alert">
                                No products found. Please revise your filters.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
