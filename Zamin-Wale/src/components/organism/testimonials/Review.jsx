"use client";

import React, { useState } from "react";

const Review = () => {
    // State to manage the visibility of each review's extra content
    const [expanded, setExpanded] = useState(null);

    // Function to toggle the visibility of content
    const toggleContent = (index) => {
        // Toggle between showing and hiding the content
        setExpanded(expanded === index ? null : index);
    };

    const reviews = [
        {
            name: "Gurucharan Singh",
            location: "Mumbai",
            text: "A highly trustworthy company for land dealings! The team is knowledgeable, supportive, and ensures a smooth transaction.",
            additionalText:
                "They provide complete assistance, from paperwork to legal formalities, making the process easy and stress-free. I highly recommend for anyone looking to buy or invest in land....",
        },
        {
            name: "Santosh Shetty",
            location: "Uran",
            text: "Best Investments with Zaminwale, specially highlight site visit, It was trip to location rather than only site visit..",
            additionalText:
                "Staff humour and knowledge is very clear and supportive only these traits made me invest 2000sqft land near Navi mumbai airport.thank you team Zaminwale",
        },
        {
            name: "Macchindra Dhawale",
            location: "Panvel",
            text: "At Zaminwale we just learnt that what is the best deal called, We will forever belive that land investment is the best investment.",
            additionalText:
                "..just all we need is better company with genuind vision.. Best land company in Mumbai.. Came from pune and booked 1 guntha land near MTHL..",
        },
        {
            name: "Shaikh Salim",
            location: "Mumbai",
            text: "Be practical before buying any property , be analytical... Search a lot about company . Then finally invest here with Zaminwale 1sqft propery..",
            additionalText:
                "Great company in all Navi mumbai region . Highly recommended for anyone who want to become land owner of property near Navi mumbai international airport.",
        },
        {
            name: "Akshay Jadhav",
            location: "Panvel",
            text: "When you want to experience good human morals with best professional service then Zaminwale is the best place for every land investment mind person.",
            additionalText:
                "There hospitality , and project explanation services is far better than any other land bankers in Mumbai , thant why Zaminwale Is Number 1 in Real Estate....",
        },
        {
            name: "Samuel Ingle",
            location: "Navi Mumbai",
            text: "If you want most reliable and transparent deal in land investment sector then none othe place is better than Zaminwale,",
            additionalText:
                "their purchase policy are unique and better than other companies in mumbai so highly recommended to every future land investor..",
        },
        {
            name: "Sameer Khan",
            location: "Uran",
            text: "Zaminwale is serving people with their clear vision and attitude, even lower earning people can find better option for land investment ",
            additionalText:
                "if you able to meet right team like Zaminwale. It's the only thing why Zaminwale is top most land banker in Mumbai. Thank you Zaminwale will visit again with my brother with another booking .",
        },
        {
            name: "Sohan Mate",
            location: "Mumbai",
            text: "If you want justified investment for your hard earned money then none othe place is better than Zaminwale...",
            additionalText:
                "very clear during dealing , accurate connectivities explanations with affordable rates made me purchase 2 guntha land in Third Mumbai.",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Customer Stories
            </h1>
            <div className="grid px-11 grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md border-gray-500 border-2"
                    >
                        <p className="text-gray-700 mb-4">
                            {review.text}
                            {expanded === index && (
                                <span className="inline">
                                    {review.additionalText}
                                </span>
                            )}
                            <a
                                href="#"
                                className="text-[#6f272b] cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the default anchor behavior
                                    toggleContent(index);
                                }}
                                aria-expanded={expanded === index}
                            >
                                {expanded === index ? "Less" : "More"}
                            </a>
                        </p>
                        <div className="flex items-center">
                            {/* <img
                                alt={`Profile picture of ${review.name}`}
                                className="w-12 h-12 rounded-full mr-4"
                                height="50"
                                src={review.image}
                                width="50"
                            /> */}
                            <div>
                                <p className="font-bold">
                                    {review.name},{" "}
                                    <span className="text-gray-500">
                                        {review.location}
                                    </span>
                                </p>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <i
                                            key={starIndex}
                                            className="fas fa-star text-yellow-500"
                                        ></i>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
