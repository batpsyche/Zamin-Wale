"use client";

import Footer from "@/components/organism/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { blogsCardData } from "@/constants/blogs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BlogPage = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const blogsPerPage = 10;
    const paginatedBlogs = blogsCardData.slice(0, page * blogsPerPage);

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <div className="flex w-full flex-1">
                <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 lg:py-10">
                    <h2 className="text-lg font-medium md:text-xl lg:text-2xl">
                        Blog Posts
                    </h2>
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedBlogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="flex flex-col border border-neutral-200 rounded-lg overflow-hidden group hover:shadow-lg"
                                >
                                    <div className="relative aspect-video w-full">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex flex-col p-4 space-y-2">
                                        <h3 className="text-base font-medium">
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {blog.excerpt}
                                        </p>
                                        <Button
                                            asChild
                                            className="mt-2 w-full bg-[#6f272b] text-white rounded-full py-1.5 text-sm"
                                        >
                                            <Link
                                                href={`/blogs/${blog.blogUrl}`}
                                            >
                                                Read More
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {paginatedBlogs.length < blogsCardData.length && (
                        <div className="flex justify-center mt-6">
                            <Button
                                onClick={loadMore}
                                disabled={loading}
                                className="bg-[#6f272b] text-white rounded-full py-2 px-4"
                            >
                                {loading ? "Loading..." : "Load More"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

const SkeletonCard = () => (
    <div className="flex flex-col border border-neutral-200 rounded-lg overflow-hidden">
        <Skeleton className="aspect-video w-full" />
        <div className="flex flex-col p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full" />
        </div>
    </div>
);

export default BlogPage;
