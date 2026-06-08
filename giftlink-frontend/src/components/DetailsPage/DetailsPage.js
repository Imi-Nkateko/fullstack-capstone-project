import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';

function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const authenticationToken = sessionStorage.getItem('auth-token');
        if (!authenticationToken) {
            // Task 1: Check for authentication and redirect
            navigate('/app/login');
            return;
        }

        // get the gift to be rendered on the details page
        const fetchGift = async () => {
            try {
                // Task 2: Fetch gift details
                // Note: If urlConfig isn't explicitly initialized in your boilerplate, 
                // you can fallback directly to an internal generic endpoint literal: `/api/gifts/${productId}`
                const response = await fetch(`/api/gifts/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGift(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGift();

        // Task 3: Scroll to top on component mount
        window.scrollTo(0, 0);

    }, [productId, navigate]);


    const handleBackClick = () => {
        // Task 4: Handle back click
        navigate(-1);
    };

    // The comments have been hardcoded for this project.
    const comments = [
        {
            author: "John Doe",
            comment: "I would like this!"
        },
        {
            author: "Jane Smith",
            comment: "Just DMed you."
        },
        {
            author: "Alice Johnson",
            comment: "I will take it if it's still available."
        },
        {
            author: "Mike Brown",
            comment: "This is a good one!"
        },
        {
            author: "Sarah Wilson",
            comment: "My family can use one. DM me if it is still available. Thank you!"
        }
    ];


    if (loading) return <div className="container mt-5">Loading...</div>;
    if (error) return <div className="container mt-5">Error: {error}</div>;
    if (!gift) return <div className="container mt-5">Gift not found</div>;

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back</button>
            <div className="card product-details-card">
                <div className="card-header text-white bg-primary">
                    <h2 className="details-title mb-0">{gift.name}</h2>
                </div>
                <div className="card-body">
                    <div className="image-placeholder-large mb-4 text-center">
                        {gift.image ? (
                            // Task 5: Display gift image
                            <img src={gift.image} alt={gift.name} className="product-image-large img-fluid rounded" />
                        ) : (
                            <div className="no-image-available-large p-5 bg-light text-muted border rounded">No Image Available</div>
                        )}
                    </div>
                    
                    {/* Task 6: Display gift details */}
                    <p><strong>Category:</strong> {gift.category}</p>
                    <p><strong>Condition:</strong> {gift.condition}</p>
                    <p><strong>Date Added:</strong> {new Date(gift.date_added * 1000).toLocaleDateString() || gift.date_added}</p>
                    <p><strong>Age (Years):</strong> {gift.age_years}</p>
                    <p><strong>Description:</strong> {gift.description}</p>
                </div>
            </div>
            
            <div className="comments-section mt-4">
                <h3 className="mb-3">Comments</h3>
                {/* Task 7: Render comments section by using the map function to go through all the comments */}
                {comments.map((comment, index) => (
                    <div key={index} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <p className="comment-author mb-1"><strong>{comment.author}:</strong></p>
                            <p className="comment-text mb-0 text-secondary">{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DetailsPage;
