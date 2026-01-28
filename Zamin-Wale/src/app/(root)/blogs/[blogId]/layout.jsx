import { blogData } from "@/constants/blogs";
import React from "react";

export async function generateMetadata({ params }) {
    const blogId = (await params).blogId;

    let title,
        description = "";

    const blogSeo = blogData.find((blog) => blog.blogUrl === blogId);
    title = blogSeo.title;
    description = blogSeo.excerpt;

    return {
        title: title,
        description: description,
    };
}

const BlogLayout = ({ children }) => {
    return <>{children}</>;
};

export default BlogLayout;
