"use client";

import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { toast } from "sonner";

const getFileSizeConverted = (_size) => {
    let fSExt = ["Bytes", "KB", "MB", "GB"],
        i = 0;
    while (_size > 900) {
        _size /= 1024;
        i++;
    }
    const size = Math.round(_size * 100) / 100;
    return size + " " + fSExt[i];
};

const DragNDrop = ({
    label = null,
    onFileChange = console.log,
    accept = "image/png, image/jpeg, image/jpg, image/webp, video/mp4",
    formats = ".png, .jpg, .jpeg, .webp, .mp4",
    formatType = "image",
    maxSize = 10,
    disabled = false,
    src = null,
    required = true,
    showPreview = true,
    maxWidth = "max-w-xl",
    ...props
}) => {
    const dropRef = useRef();
    const dragCounter = useRef(0);
    const dropHeight = useRef();
    const dragging = useRef();
    const [file, setFile] = useState(src);

    useEffect(() => {
        setFile(src);
    }, [src]);

    const fileSizeValid = useCallback(
        (fileSize) => {
            if (maxSize === 0) return true;
            if (parseInt(fileSize / 1024) <= maxSize * 1000) return true;
            return false;
        },
        [maxSize]
    );

    const fileLink = useMemo(
        () =>
            formatType === "image"
                ? file === src
                    ? src
                    : file
                    ? Object.prototype.toString.call(file) === "[object String]"
                        ? file
                        : URL.createObjectURL(file)
                    : null
                : null,
        [file, formatType, src]
    );

    const removeFile = () => {
        setFile();
        onFileChange({
            target: {
                id: props.id,
                files: [],
                type: "file",
            },
        });
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0)
            dragging.current = true;
    };
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current === 0) dragging.current = false;
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragging.current = false;
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const inputFile = e.dataTransfer.files[0];
            if (fileSizeValid(inputFile.size)) {
                // setFile(inputFile)
                onFileChange({
                    target: {
                        id: props.id,
                        files: e.dataTransfer.files,
                        type: "file",
                    },
                });
                e.dataTransfer.clearData();
                dragCounter.current = 0;
            } else toast.error(`File size should be less than ${maxSize}MB`);
        }
    };

    const handleFileInput = (e) => {
        const inputFile = e.target.files[0];
        if (fileSizeValid(inputFile.size)) {
            // setFile(inputFile)
            onFileChange(e);
        } else toast.error(`File size should be less than ${maxSize}MB`);
    };

    useEffect(() => {
        const dropDiv = dropRef.current;
        dropHeight.current = dropDiv.offsetHeight;
        dropDiv.addEventListener("dragenter", handleDragIn);
        dropDiv.addEventListener("dragleave", handleDragOut);
        dropDiv.addEventListener("dragover", handleDrag);
        dropDiv.addEventListener("drop", handleDrop);
        return () => {
            dropDiv.removeEventListener("dragenter", handleDragIn);
            dropDiv.removeEventListener("dragleave", handleDragOut);
            dropDiv.removeEventListener("dragover", handleDrag);
            dropDiv.removeEventListener("drop", handleDrop);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="flex h-full flex-col">
                <div
                    className={cn(
                        "mt-1 aspect-video overflow-hidden rounded-md border-neutral-300 transition-all duration-300 dark:border-neutral-700",
                        file
                            ? "group relative border shadow"
                            : "flex-grow border-2 border-dashed hover:border-neutral-400 dark:hover:border-neutral-500",
                        maxWidth
                    )}
                    ref={dropRef}
                >
                    {!file ? (
                        <div className="flex h-full w-full flex-col items-center justify-center space-y-1 p-4 text-center">
                            <div className="mx-auto mb-3 w-8 text-slate-400">
                                <FileIcon
                                    extension={formats
                                        .split(",")[0]
                                        .replace(".", "")}
                                    {...defaultStyles[
                                        formats.split(",")[0].replace(".", "")
                                    ]}
                                />
                            </div>
                            <div className="flex flex-col text-sm text-slate-600">
                                <label
                                    disabled={disabled}
                                    htmlFor={props.id}
                                    className={cn(
                                        "relative flex cursor-pointer flex-col rounded-md font-medium text-pink-700 focus-within:outline-none focus-within:ring-0",
                                        disabled ? "cursor-not-allowed" : ""
                                    )}
                                >
                                    {props.multiple ? (
                                        <span>Upload files</span>
                                    ) : (
                                        <span>
                                            Upload {label ? label : "a file"}
                                        </span>
                                    )}
                                    <input
                                        type="file"
                                        className="sr-only disabled:cursor-not-allowed"
                                        required={required}
                                        onChange={handleFileInput}
                                        disabled={disabled}
                                        accept={accept}
                                        name={props.id}
                                        {...props}
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-slate-500">
                                <span>
                                    {accept === "*" ? "All formats" : formats}
                                </span>{" "}
                                {maxSize === 0 ? null : (
                                    <span>up to {maxSize}MB</span>
                                )}
                            </p>
                        </div>
                    ) : formatType === "image" ? (
                        <>
                            <div className="relative aspect-video h-full w-full border border-neutral-200 dark:border-neutral-700">
                                {fileLink?.endsWith(".mp4") ? (
                                    <video
                                        src={fileLink}
                                        className="object-contain transition-all duration-300 group-hover:opacity-50 group-hover:blur-sm"
                                    />
                                ) : (
                                    <Image
                                        src={fileLink}
                                        alt={label || "Video Uploaded"}
                                        fill
                                        priority
                                        className="object-contain transition-all duration-300 group-hover:opacity-50 group-hover:blur-sm"
                                    />
                                )}
                            </div>
                            <div
                                className="absolute inset-0 z-10 flex h-full w-full backdrop-blur-sm scale-0 cursor-pointer items-center justify-center transition-all duration-300 group-hover:scale-100"
                                onClick={removeFile}
                            >
                                <TrashIcon className="h-8 w-8 text-red-500" />
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center space-y-1 p-4 text-center">
                            <div className="relative aspect-video h-full flex flex-col w-full items-center justify-center">
                                <div className="mx-auto mb-3 w-8 text-slate-400">
                                    <FileIcon extension="mp4" />
                                </div>
                                {label ? label : "Video"} has been uploaded
                                <div
                                    className="absolute inset-0 z-10 flex h-full w-full backdrop-blur-sm scale-0 cursor-pointer items-center justify-center transition-all duration-300 group-hover:scale-100"
                                    onClick={removeFile}
                                >
                                    <TrashIcon className="h-8 w-8 text-red-500" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DragNDrop;
