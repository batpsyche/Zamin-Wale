import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getFirstName = text => text.split(' ')[0];

export const getType = key => Object.prototype.toString.call(key).slice(8, -1)

export const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) return null;

    const crore = 10000000;
    const lakh = 100000;

    if (value >= crore) {
        return (value / crore).toFixed(2).replace(/\.00$/, "") + " Cr";
    } else if (value >= lakh) {
        return (value / lakh).toFixed(2).replace(/\.00$/, "") + " L";
    } else {
        return value.toFixed(2).replace(/\.00$/, "");
    }
};

export const formatRange = (minValue, maxValue) => {
    const formattedMin = formatCurrency(minValue);
    const formattedMax = formatCurrency(maxValue);

    if (formattedMin && formattedMax) {
        return `${formattedMin} - ${formattedMax}`;
    } else if (formattedMin) {
        return formattedMin;
    } else if (formattedMax) {
        return formattedMax;
    } else {
        return null;
    }
};

export const sliceParagraph = (paragraph, minWords = 10, maxWords = 15) => {
    if (!paragraph || typeof paragraph !== 'string') {
        console.warn('Invalid paragraph input');
        return '';
    }
    const words = paragraph.split(' ');
    const wordCount = words.length;

    if (wordCount <= maxWords) {
        return paragraph;
    }
    const slicedWords = words.slice(0, maxWords);
    return slicedWords.join(' ') + '...';
};

export const extractYouTubeVideoID = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.*|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : null;
}
