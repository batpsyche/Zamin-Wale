"use client";

import {
    getOneProperty,
    updateProperty,
    uploadPropertyImage,
} from "@/actions/property";
import DragNDrop from "@/components/atoms/DragNDrop";
import Loading from "@/components/atoms/Loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { extractYouTubeVideoID } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const EditSchema = z.object({
    listingType: z.enum(["Sell", "Rent/Lease"], {
        required_error: "You need to select type.",
    }),
    propertyType: z.enum(["Residential", "Commercial", "Villa/bungalow"], {
        required_error: "You need to select Property Type.",
    }),
    propertyCategories: z.string().optional(),
    city: z.string({
        required_error: "Please select city.",
    }),
    locality: z.string({
        required_error: "Please select locality.",
    }),
    plotArea: z.string({
        required_error: "Please enter area.",
    }),
    plotAreaUnit: z.string({
        required_error: "Please enter area unit.",
    }),
    length: z
        .string({
            required_error: "Please enter length.",
        })
        .optional(),
    breadth: z
        .string({
            required_error: "Please enter breadth.",
        })
        .optional(),
    allowedFloors: z.string({
        required_error: "Please enter allowed floors",
    }),
    hasBoundaryWall: z.boolean().default(false),
    openSides: z.enum(["1", "2", "3", "4"], {
        required_error: "You need to option",
    }),
    hasConstruction: z.boolean().default(false),
    possessionBy: z.string({
        required_error: "Please add possession by",
    }),
    ownership: z.enum(
        ["freehold", "leasehold", "co-operative society", "power of attorney"],
        {
            required_error: "You need to option",
        }
    ),
    priceTotal: z.string({
        required_error: "Please enter Price.",
    }),
    pricePerSQFT: z.string({
        required_error: "Please enter Price.",
    }),
    inclusivePrice: z.boolean().default(false),
    isTaxExcluded: z.boolean().default(false),
    isPriceNegotiable: z.boolean().default(false),
    uniqueFeatures: z.string({
        required_error: "Please enter uniqueness of your property.",
    }),
    propertyVideo: z.string().optional(),
    image1: z.string().optional(),
    image2: z.string().optional(),
    image3: z.string().optional(),
    image4: z.string().optional(),
    image5: z.string().optional(),
    amenities: z.array(z.string()).optional(),
    overlooking: z
        .array(z.string().optional()),
    otherFeatures: z.union([
        z.enum(["In a gated society", "Corner Property"]),
        z.literal("")
    ]).optional().nullable(),
    propertyFacing: z.union([
        z.enum([
            "North",
            "South",
            "East",
            "West",
            "North-East",
            "North-West",
            "South-East",
            "South-West",
        ]),
        z.literal(""),
    ]).optional().nullable(),
    locationAdvantages: z
        .array(z.string()).optional(),
});

const Page = () => {
    const { propertyId } = useParams();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            listingType: "",
            propertyType: "",
            propertyCategories: "",
            city: "",
            locality: "",
            plotArea: "",
            plotAreaUnit: "",
            length: "",
            breadth: "",
            allowedFloors: "",
            hasBoundaryWall: "",
            openSides: "",
            hasConstruction: "",
            possessionBy: "",
            ownership: "",
            priceTotal: "",
            pricePerSQFT: "",
            inclusivePrice: "",
            isTaxExcluded: "",
            isPriceNegotiable: "",
            uniqueFeatures: "",
            propertyVideo: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            image5: "",
            amenities: [],
            overlooking: [],
            otherFeatures: "",
            propertyFacing: "",
            locationAdvantages: [],
        },
    });

    const { reset, setValue, watch } = form;

    const selectedPropertyType = watch("propertyType");

    useEffect(() => {
        const fetchProperty = async () => {
            const { result = {} } = await getOneProperty(propertyId);
            reset({
                listingType: result?.listingType || "",
                propertyType: result?.propertyType || "",
                propertyCategories: result?.propertyCategories || "",
                city: result?.city || "",
                locality: result?.locality || "",
                plotArea: result?.plotArea || "",
                plotAreaUnit: result?.plotAreaUnit || "",
                length: result?.length || "",
                breadth: result?.breadth || "",
                allowedFloors: result?.allowedFloors || "",
                hasBoundaryWall: result?.hasBoundaryWall || false,
                openSides: result?.openSides || "",
                hasConstruction: result?.hasConstruction || false,
                possessionBy: result?.possessionBy || "",
                ownership: result?.ownership || "",
                priceTotal: result?.priceTotal || "",
                pricePerSQFT: result?.pricePerSQFT || "",
                inclusivePrice: result?.inclusivePrice || false,
                isTaxExcluded: result?.isTaxExcluded || false,
                isPriceNegotiable: result?.isPriceNegotiable || false,
                uniqueFeatures: result?.uniqueFeatures || "",
                propertyVideo: result?.propertyVideo ? `https://www.youtube.com/embed/${result?.propertyVideo}` : null || "",
                image1: result?.propertyPhotos[0] || "",
                image2: result?.propertyPhotos[1] || "",
                image3: result?.propertyPhotos[2] || "",
                image4: result?.propertyPhotos[3] || "",
                image5: result?.propertyPhotos[4] || "",
                amenities: result?.amenities || [],
                overlooking: result?.overlooking || [],
                otherFeatures: result?.otherFeatures || "",
                propertyFacing: result?.propertyFacing || "",
                locationAdvantages: result?.locationAdvantages || [],
            });
        };
        fetchProperty();
    }, [propertyId, reset]);

    useEffect(() => {
        setValue("propertyCategories", "");
    }, [selectedPropertyType, setValue]);

    const handleFileChange = async (e, fieldName) => {
        const files = e.target.files;
        if (files.length === 0) return;
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        const fileResp = await uploadPropertyImage({ body: formData });
        const uploadedImageUrl = fileResp;
        form.setValue(fieldName, uploadedImageUrl);
    };

    const onSubmit = async (values) => {
        setLoading(true);
        const body = {
            ...values,
            propertyId: propertyId,
            propertyVideo: extractYouTubeVideoID(values.propertyVideo),
            propertyPhotos: [
                values.image1,
                values.image2,
                values.image3,
                values.image4,
                values.image5,
            ].filter(Boolean),
        };
        try {
            const resp = await updateProperty(body);
            setLoading(false);
            toast.success(resp.message);
            router.push("/dashboard/properties");
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    const filteredCategories =
        Data[1].data.find((type) => type.value === selectedPropertyType)
            ?.data || [];

    return (
        <div className="flex w-full h-full relative">
            <div className="absolute top-0 left-0 flex w-full rounded-lg h-full overflow-x-hidden overflow-y-auto scrollbar md:p-4">
                <div className="w-full flex flex-col h-fit">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 lg:space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="listingType"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[0].label}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex w-full flex-wrap"
                                            >
                                                {Data[0].data.map(
                                                    ({ value, label }) => (
                                                        <FormItem
                                                            key={value}
                                                            className={`flex items-center space-y-0 ${field.value ===
                                                                value
                                                                ? "bg-blue-100 border-[#6f272b]"
                                                                : "bg-white border"
                                                                } rounded-full px-4 py-2`}
                                                        >
                                                            <FormControl className="sr-only">
                                                                <RadioGroupItem
                                                                    value={
                                                                        value
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="propertyType"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[1].label}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex w-full flex-wrap"
                                            >
                                                {Data[1].data.map(
                                                    ({ value, label }) => (
                                                        <FormItem
                                                            key={value}
                                                            className={`flex items-center space-y-0 ${field.value ===
                                                                value
                                                                ? "bg-blue-100 border-[#6f272b]"
                                                                : "bg-white border"
                                                                } rounded-full px-4 py-2`}
                                                        >
                                                            <FormControl className="sr-only">
                                                                <RadioGroupItem
                                                                    value={
                                                                        value
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {filteredCategories.length > 0 && (
                                <FormField
                                    control={form.control}
                                    name="propertyCategories"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                Select Category
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                    className="flex w-full flex-wrap"
                                                >
                                                    {filteredCategories.map(
                                                        ({ value, label }) => (
                                                            <FormItem
                                                                key={value}
                                                                className={`flex items-center space-y-0 ${field.value ===
                                                                    value
                                                                    ? "bg-blue-100 border-[#6f272b]"
                                                                    : "bg-white border"
                                                                    } rounded-full px-4 py-2`}
                                                            >
                                                                <FormControl className="sr-only">
                                                                    <RadioGroupItem
                                                                        value={
                                                                            value
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                {Data[2].label}
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select City" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Data[2].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <SelectItem
                                                                    key={value}
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="locality"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                {Data[3].label}
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Locality" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Data[3].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <SelectItem
                                                                    key={value}
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="plotArea"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                {Data[4].label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Plot Area"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="plotAreaUnit"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                Plot Area Unit
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select City" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Data[4].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <SelectItem
                                                                    key={value}
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex w-full gap-4 flex-col">
                                <FormLabel>{Data[5].label}</FormLabel>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <FormField
                                        control={form.control}
                                        name="length"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Plot Length "
                                                        {...field}
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="breadth"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Plot Breadth"
                                                        {...field}
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="allowedFloors"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[6].label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="No of floors allowed"
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="hasBoundaryWall"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                {Data[7].label}
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex w-full flex-wrap"
                                                >
                                                    {Data[7].data.map(
                                                        ({ value, label }) => (
                                                            <FormItem
                                                                key={value}
                                                                className={`flex items-center space-y-0 ${field.value ===
                                                                    value
                                                                    ? "bg-blue-100 border-[#6f272b]"
                                                                    : "bg-white border"
                                                                    } rounded-full px-4 py-2`}
                                                            >
                                                                <FormControl className="sr-only">
                                                                    <RadioGroupItem
                                                                        value={
                                                                            value
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="openSides"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                {Data[8].label}
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex w-full flex-wrap"
                                                >
                                                    {Data[8].data.map(
                                                        (data, i) => (
                                                            <FormItem
                                                                key={i}
                                                                className={`flex items-center space-y-0 ${field.value ===
                                                                    data?.value
                                                                    ? "bg-blue-100 border-[#6f272b]"
                                                                    : "bg-white border"
                                                                    } rounded-full px-4 py-2`}
                                                            >
                                                                <FormControl className="sr-only">
                                                                    <RadioGroupItem
                                                                        value={
                                                                            data?.value
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {
                                                                        data?.label
                                                                    }
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="hasConstruction"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                {Data[9].label}
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex w-full flex-wrap"
                                                >
                                                    {Data[9].data.map(
                                                        ({ value, label }) => (
                                                            <FormItem
                                                                key={value}
                                                                className={`flex items-center space-y-0 ${field.value ===
                                                                    value
                                                                    ? "bg-blue-100 border-[#6f272b]"
                                                                    : "bg-white border"
                                                                    } rounded-full px-4 py-2`}
                                                            >
                                                                <FormControl className="sr-only">
                                                                    <RadioGroupItem
                                                                        value={
                                                                            value
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="possessionBy"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel>
                                                {Data[10].label}
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select City" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Data[10].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <SelectItem
                                                                    key={value}
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="ownership"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[11].label}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex w-full flex-wrap"
                                            >
                                                {Data[11].data.map(
                                                    ({ value, label }) => (
                                                        <FormItem
                                                            key={value}
                                                            className={`flex items-center space-y-0 ${field.value ===
                                                                value
                                                                ? "bg-blue-100 border-[#6f272b]"
                                                                : "bg-white border"
                                                                } rounded-full px-4 py-2`}
                                                        >
                                                            <FormControl className="sr-only">
                                                                <RadioGroupItem
                                                                    value={
                                                                        value
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full gap-4 flex-col">
                                <FormLabel>{Data[12].label}</FormLabel>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <FormField
                                        control={form.control}
                                        name="priceTotal"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Expected price"
                                                        {...field}
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pricePerSQFT"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Price per sqft"
                                                        {...field}
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="inclusivePrice"
                                    render={({ field }) => (
                                        <FormItem className="items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel className="text-base">
                                                All inlcusice price
                                            </FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isTaxExcluded"
                                    render={({ field }) => (
                                        <FormItem className="items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel className="text-base">
                                                Tax and Govt. charges exclude
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="isPriceNegotiable"
                                    render={({ field }) => (
                                        <FormItem className="items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel className="text-base">
                                                Price Negotiable
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="uniqueFeatures"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[12].label}</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Share some details about your property"
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="propertyVideo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[19].label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Update Your Youtube Video url"
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
                                                        handleFileChange(
                                                            e,
                                                            "image1"
                                                        )
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
                                                        handleFileChange(
                                                            e,
                                                            "image2"
                                                        )
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
                                                        handleFileChange(
                                                            e,
                                                            "image3"
                                                        )
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
                                                        handleFileChange(
                                                            e,
                                                            "image4"
                                                        )
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
                                                        handleFileChange(
                                                            e,
                                                            "image5"
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="amenities"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{Data[14]?.label}</FormLabel>
                                        <div className="flex gap-2 flex-wrap">
                                            {(Data[14]?.data || []).map(
                                                (item) => (
                                                    <FormField
                                                        key={item.value}
                                                        control={form.control}
                                                        name="amenities"
                                                        render={() => {
                                                            return (
                                                                <FormItem className="w-fit">
                                                                    <FormControl className="sr-only">
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                item.value
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                        [
                                                                                            ...field.value,
                                                                                            item.value,
                                                                                        ]
                                                                                    )
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (
                                                                                                value
                                                                                            ) =>
                                                                                                value !==
                                                                                                item.value
                                                                                        )
                                                                                    );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel
                                                                        className={`flex font-normal items-center space-y-0 ${field.value?.includes(
                                                                            item.value
                                                                        )
                                                                            ? "bg-blue-100 border-[#6f272b]"
                                                                            : "bg-white border"
                                                                            } rounded-full px-4 py-2`}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="overlooking"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{Data[15]?.label}</FormLabel>
                                        <div className="flex gap-2 flex-wrap">
                                            {(Data[15]?.data || []).map(
                                                (item) => (
                                                    <FormField
                                                        key={item.value}
                                                        control={form.control}
                                                        name="overlooking"
                                                        render={() => {
                                                            return (
                                                                <FormItem className="w-fit">
                                                                    <FormControl className="sr-only">
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                item.value
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                        [
                                                                                            ...field.value,
                                                                                            item.value,
                                                                                        ]
                                                                                    )
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (
                                                                                                value
                                                                                            ) =>
                                                                                                value !==
                                                                                                item.value
                                                                                        )
                                                                                    );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel
                                                                        className={`flex font-normal items-center space-y-0 ${field.value?.includes(
                                                                            item.value
                                                                        )
                                                                            ? "bg-blue-100 border-[#6f272b]"
                                                                            : "bg-white border"
                                                                            } rounded-full px-4 py-2`}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="otherFeatures"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[16]?.label}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value || ""} // Use the current value of `field.value`
                                            >
                                                {Data[16]?.data.map(
                                                    ({ value, label }) => (
                                                        <FormItem
                                                            key={value}
                                                            className="space-x-2"
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value={
                                                                        value
                                                                    }
                                                                    checked={
                                                                        field.value ===
                                                                        value
                                                                    } // Check if this value is selected
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="propertyFacing"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>{Data[17].label}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex w-full flex-wrap"
                                            >
                                                {Data[17].data.map(
                                                    ({ value, label }) => (
                                                        <FormItem
                                                            key={value}
                                                            className={`flex items-center space-y-0 ${field.value ===
                                                                value
                                                                ? "bg-blue-100 border-[#6f272b]"
                                                                : "bg-white border"
                                                                } rounded-full px-4 py-2`}
                                                        >
                                                            <FormControl className="sr-only">
                                                                <RadioGroupItem
                                                                    value={
                                                                        value
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="locationAdvantages"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{Data[18]?.label}</FormLabel>
                                        <div className="flex gap-2 flex-wrap">
                                            {(Data[18]?.data || []).map(
                                                (item) => (
                                                    <FormField
                                                        key={item.value}
                                                        control={form.control}
                                                        name="overlooking"
                                                        render={() => {
                                                            return (
                                                                <FormItem className="w-fit">
                                                                    <FormControl className="sr-only">
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                item.value
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                        [
                                                                                            ...field.value,
                                                                                            item.value,
                                                                                        ]
                                                                                    )
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (
                                                                                                value
                                                                                            ) =>
                                                                                                value !==
                                                                                                item.value
                                                                                        )
                                                                                    );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel
                                                                        className={`flex font-normal items-center space-y-0 ${field.value?.includes(
                                                                            item.value
                                                                        )
                                                                            ? "bg-blue-100 border-[#6f272b]"
                                                                            : "bg-white border"
                                                                            } rounded-full px-4 py-2`}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="px-4 py-2 bg-[#6f272b] text-white rounded-lg"
                                disabled={loading}
                            >
                                {loading ? <Loading /> : "Update Property"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Page;

const Data = [
    {
        label: "I'm looking to",
        data: [
            { value: "Sell", label: "Sell" },
            { value: "Rent/Lease", label: "Rent/Lease" },
        ],
    },
    {
        label: "What kind of property do you have?",
        data: [
            {
                label: "Residential",
                value: "Residential",
                data: [
                    { label: "Flat/Apartment", value: "Flat/Apartment" },
                    { label: "Plot/Land", value: "Plot/Land" },
                    { label: "Other", value: "Other" },
                ],
            },
            {
                label: "Commercial",
                value: "Commercial",
                data: [
                    { label: "Flat/Apartment", value: "Flat/Apartment" },
                    { label: "Plot/Land", value: "Plot/Land" },
                    { label: "Other", value: "Other" },
                ],
            },
            {
                label: "Villa/bungalow",
                value: "Villa/bungalow",
                data: [
                    { label: "Villa", value: "Villa" },
                    { label: "Bungalow", value: "Bungalow" },
                    { label: "Farmhouse", value: "Farmhouse" },
                ],
            },
        ],
    },
    {
        label: "City",
        data: [
            { value: "Mumbai", label: "Mumbai" },
            { value: "Navi Mumbai", label: "Navi Mumbai" },
            { value: "Third Mumbai", label: "Third Mumbai" },
        ],
    },
    {
        label: "Locality",
        data: [
            { value: "Thane", label: "Thane" },
            { label: "Panvel", value: "Panvel" },
            { label: "Uran", value: "Uran" },
            { label: "Chirle", value: "Chirle" },
            { label: "Ranjanpada", value: "Ranjanpada" },
            { label: "Vindhane", value: "Vindhane" },
            { label: "Karjat", value: "Karjat" },
        ],
    },
    {
        label: "Add area details",
        data: [
            { label: "sqft", value: "sqft" },
            { label: "sqyard", value: "sqyard" },
            { label: "sqm", value: "sqm" },
            { label: "acres", value: "acres" },
            { label: "marla", value: "marla" },
            { label: "cents", value: "cents" },
        ],
    },
    {
        label: "Property Dimesions",
    },
    {
        label: "Floors allowed for construction",
    },
    {
        label: "Is there boundry walls around the property ?",
        data: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
        ],
    },
    {
        label: "No. of open sides ?",
        data: [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
        ],
    },
    {
        label: "Any construction done on this property",
        data: [
            { value: true, label: "Yes" },
            { value: false, label: "No" },
        ],
    },
    {
        label: "Possession by",
        data: [
            { value: "Immediate", label: "Immediate" },
            { value: "Within 3 months", label: "Within 3 months" },
            { value: "within 6 months", label: "within 6 months" },
            { value: "By 2025", label: "By 2025" },
            { value: "By 2026", label: "By 2026" },
            { value: "By 2027", label: "By 2027" },
        ],
    },
    {
        label: "Ownership",
        data: [
            { value: "freehold", label: "Freehold" },
            { value: "leasehold", label: "Leasehold" },
            { value: "co-operative society", label: "Co-operative Society" },
            { value: "power of attorney", label: "Power of Attorney" },
        ],
    },
    {
        label: "Price Details",
    },
    {
        label: "What makes your property unique",
    },
    {
        label: "Amenities",
        data: [
            { value: "Maintenance Staff", label: "Maintenance Staff" },
            { value: "Water Storage", label: "Water Storage" },
            { value: "Rain Water Harvesting", label: "Rain Water Harvesting" },
            { value: "Vaastu Complaint", label: "Vaastu Complaint" },
        ],
    },
    {
        label: "Overlooking",
        data: [
            { value: "Pool", label: "Pool" },
            { value: "Park/Garden", label: "Park/Garden" },
            { value: "Club", label: "Club" },
            { value: "Main Road", label: "Main Road" },
            { value: "Others", label: "Others" },
        ],
    },
    {
        label: "Other Features",
        data: [
            { value: "In a gated society", label: "In a gated society" },
            { value: "Corner Property", label: "Corner Property" },
        ],
    },
    {
        label: "Property Facing",
        data: [
            { value: "North", label: "North" },
            { value: "South", label: "South" },
            { value: "East", label: "East" },
            { value: "West", label: "West" },
            { value: "North-East", label: "North-East" },
            { value: "North-West", label: "North-West" },
            { value: "South-East", label: "South-East" },
            { value: "South-West", label: "South-West" },
        ],
    },
    {
        label: "Location Advantages",
        data: [
            {
                value: "Close to metro station",
                label: "Close to metro station",
            },
            { value: "Close to school", label: "Close to school" },
            { value: "Close to hospital", label: "Close to hospital" },
            { value: "Close to market", label: "Close to market" },
            {
                value: "Close to railway station",
                label: "Close to railway station",
            },
        ],
    },
    {
        label: "Video Url",
    },
];
