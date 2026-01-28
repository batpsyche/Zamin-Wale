import { uploadPropertyImage } from "@/actions/property";
import DragNDrop from "@/components/atoms/DragNDrop";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { extractYouTubeVideoID } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const PhotosNVideoSchema = z.object({
    propertyVideo: z.string().optional().nullable(),
    image1: z.string().optional(),
    image2: z.string().optional(),
    image3: z.string().optional(),
    image4: z.string().optional(),
    image5: z.string().optional(),
});

const PhotoNVideo = ({ onSubmit, prev, currentStep, loading, formData }) => {
    const form = useForm({
        resolver: zodResolver(PhotosNVideoSchema),
        defaultValues: formData || {},
    });

    const handleFileChange = async (e, fieldName) => {
        const files = e.target.files;
        if (files.length === 0) return;
        const file = files[0];

        const formData = new FormData();
        formData.append("file", file);
        const fileResp = await uploadPropertyImage({ body: formData });
        if (!fileResp) {
            toast.error("Upload Failed");
        }
        const uploadedImageUrl = fileResp;
        form.setValue(fieldName, uploadedImageUrl);
    };

    const handleSubmit = (data) => {
        const filteredData = {
            ...data,
            propertyVideo: extractYouTubeVideoID(data?.propertyVideo),
            propertyPhotos: [
                data.image1,
                data.image2,
                data.image3,
                data.image4,
                data.image5,
            ].filter(Boolean),
        };
        onSubmit(filteredData);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-10"
            >
                <div className="flex flex-col w-full">
                    <span className="text-xl md:text-2xl font-semibold">
                        Add photos of your property
                    </span>
                </div>
                <FormField
                    control={form.control}
                    name="propertyVideo"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
                            <FormLabel>Video (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter Youtube Video Url"
                                    {...field}
                                    value={field.value ?? ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 lg:gap-y-20 w-full">
                    <FormField
                        control={form.control}
                        name="image1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image 1</FormLabel>
                                <FormControl>
                                    <DragNDrop
                                        maxSize="100"
                                        src={field.value}
                                        onFileChange={(e) =>
                                            handleFileChange(e, "image1")
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image 2</FormLabel>
                                <FormControl>
                                    <DragNDrop
                                        maxSize="100"
                                        src={field.value}
                                        onFileChange={(e) =>
                                            handleFileChange(e, "image2")
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image3"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image 3</FormLabel>
                                <FormControl>
                                    <DragNDrop
                                        maxSize="100"
                                        src={field.value}
                                        onFileChange={(e) =>
                                            handleFileChange(e, "image3")
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image4"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image 4</FormLabel>
                                <FormControl>
                                    <DragNDrop
                                        maxSize="100"
                                        src={field.value}
                                        onFileChange={(e) =>
                                            handleFileChange(e, "image4")
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image5"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image 5</FormLabel>
                                <FormControl>
                                    <DragNDrop
                                        maxSize="100"
                                        src={field.value}
                                        onFileChange={(e) =>
                                            handleFileChange(e, "image5")
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex w-full py-4">
                    <Button
                        onClick={prev}
                        className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-4"
                        disabled={currentStep === 0 || loading}
                    >
                        <ArrowLeft />
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-[#6f272b] text-white rounded-lg"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Continue"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PhotoNVideo;
