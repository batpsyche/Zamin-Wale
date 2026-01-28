"use client";

import Footer from "@/components/organism/Footer";
import TrendingNews from "@/components/organism/TrendingNews";
import { blogData } from "@/constants/blogs";
import { useParams } from "next/navigation";
import React from "react";

const BlogPage = () => {
    const { blogId } = useParams();

    const blog = blogData.find((item) => item.blogUrl === blogId);

    if (!blog) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-gray-600">
                    Blog not found
                </h1>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-2xl lg:text-4xl font-medium text-gray-800 mb-6">
                    {blog.title}
                </h1>
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-auto rounded-lg shadow-md mb-8"
                />
                <div
                    className="prose prose-lg prose-gray max-w-none text-justify"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
            <TrendingNews />
            <Footer />
        </>
    );
};

export default BlogPage;
