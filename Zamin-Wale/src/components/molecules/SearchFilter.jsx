"use client";

import { filterProperty } from "@/actions/property";
import useZaminwaleStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const Location = [
    { all: "All" },
    { thane: "Thane" },
    { panvel: "Panvel" },
    { uran: "Uran" },
    { chirle: "Chirle" },
    { ranjanpada: "Ranjanpada" },
    { vindhane: "Vindhane" },
    { karjat: "Karjat" },
];

const SearchTrigger = (locationId) => {
    const matchingLocation = Location.find((loc) =>
        Object.keys(loc).includes(locationId)
    );

    if (matchingLocation) {
        return matchingLocation[locationId];
    } else {
        console.warn(`No matching location found for: ${locationId}`);
        return null;
    }
};

const FilterSchema = z.object({
    propertyType: z.string().optional(),
    propertyCategories: z.string().optional(),
    city: z.string().optional(),
    locality: z.string().optional(),
    // plotAreaMinValue: z.string().optional(),
    // plotAreaMaxValue: z.string().optional(),
    allowedFloors: z.string().optional(),
    // hasBoundaryWall: z.boolean().optional(),
    openSides: z.string().optional(),
    // hasConstruction: z.boolean().optional(),
    // possessionBy: z.string().optional(),
    ownership: z.string().optional(),
    priceTotalMinValue: z.string().optional(),
    priceTotalMaxValue: z.string().optional(),
    // inclusivePrice: z.boolean().optional(),
    // isTaxExcluded: z.boolean().optional(),
    // isPriceNegotiable: z.boolean().optional(),
    amenities: z.array(z.string()).optional(),
    overlooking: z.array(z.string()).optional(),
    otherFeatures: z.string().optional(),
    propertyFacing: z.string().optional(),
    locationAdvantages: z.array(z.string()).optional(),
});

const SearchFilter = () => {
    const params = useParams();
    const dispatch = useZaminwaleStore((store) => store.dispatch);
    const searchParams = useSearchParams();
    const propertyType = searchParams.get("propertyType");
    const priceTotalMinValue = searchParams.get("priceTotalMinValue");
    const priceTotalMaxValue = searchParams.get("priceTotalMaxValue");

    const form = useForm({
        resolver: zodResolver(FilterSchema),
        defaultValues: {
            propertyType: propertyType || "",
            propertyCategories: "",
            city: "",
            locality: SearchTrigger(params.locationId),
            // plotAreaMinValue: "100 sqft",
            // plotAreaMaxValue: "1300 sqft",
            allowedFloors: "",
            // hasBoundaryWall: false,
            openSides: "",
            // hasConstruction: false,
            possessionBy: "",
            ownership: "",
            priceTotalMinValue: priceTotalMinValue || "",
            priceTotalMaxValue: priceTotalMaxValue || "",
            // inclusivePrice: false,
            isTaxExcluded: false,
            // isPriceNegotiable: false,
            amenities: [],
            overlooking: [],
            otherFeatures: "",
            propertyFacing: "",
            locationAdvantages: [],
        },
    });

    const onSubmit = async (values) => {
        try {
            const resp = await filterProperty(values);
            dispatch({
                type: "SET_STATE",
                payload: { searchList: resp.result },
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (params.locationId) {
            const matchedLocality = SearchTrigger(params.locationId);
            if (matchedLocality) {
                const initialFilter = {
                    locality: matchedLocality,
                };
                onSubmit(initialFilter);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    useEffect(() => {
        if (params.locationId && propertyType) {
            const matchedLocality = SearchTrigger(params.locationId);
            if (matchedLocality) {
                const initialFilter = {
                    locality: matchedLocality,
                    propertyType: propertyType,
                };
                onSubmit(initialFilter);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.locationId, propertyType]);

    useEffect(() => {
        if (params.locationId && priceTotalMinValue && priceTotalMaxValue) {
            const matchedLocality = SearchTrigger(params.locationId);
            if (matchedLocality) {
                const initialFilter = {
                    locality: matchedLocality,
                    priceTotalMinValue,
                    priceTotalMaxValue,
                };
                onSubmit(initialFilter);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.locationId, priceTotalMinValue, priceTotalMaxValue]);

    return (
        <>
            <div className="flex relative flex-col h-fit divide-y w-full p-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="divide-y-2"
                    >
                        <Button
                            type="submit"
                            className="px-4 w-full py-2 bg-[#6f272b] text-white rounded-lg"
                        >
                            Apply Filter
                        </Button>
                        <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[0].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[0].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                            name="propertyCategories"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[1].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[1].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                            name="city"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[2].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[2].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                            name="locality"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[3].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[3].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                        <div className="flex flex-col py-4 gap-4 w-full">
                            <FormLabel>{FilterData[4].label}</FormLabel>
                            <div className="grid grid-cols-2 w-full gap-2">
                                <FormField
                                    control={form.control}
                                    name="priceTotalMinValue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={
                                                        field.value ?? ""
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Min Value" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {FilterData[4].data[0].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <SelectItem
                                                                    key={label}
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
                                    name="priceTotalMaxValue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={
                                                        field.value ?? ""
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Max Value" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {FilterData[4].data[1].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <SelectItem
                                                                    key={label}
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
                        </div>
                        {/* <div className="flex flex-col py-4 gap-4 w-full">
                            <FormLabel>{FilterData[19].label}</FormLabel>
                            <div className="grid grid-cols-2 w-full gap-2">
                                <FormField
                                    control={form.control}
                                    name="plotAreaMinValue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value ?? ""}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Min Value" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {FilterData[19].data[0].data.map(({ value, label }) => (
                                                            <SelectItem key={label} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="plotAreaMaxValue"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value ?? ""}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Max Value" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {FilterData[19].data[1].data.map(({ value, label }) => (
                                                            <SelectItem key={label} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div> */}
                        <FormField
                            control={form.control}
                            name="allowedFloors"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[5].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[5].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                        {/* <FormField
                            control={form.control}
                            name="hasBoundaryWall"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[6].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[6].data.map((item, index) => (
                                                <FormItem
                                                    key={index}
                                                    className={`flex items-center space-y-0 ${field.value === item.value
                                                        ? "bg-blue-100 border border-blue-400"
                                                        : "bg-white border"
                                                        } rounded-full px-4 py-2`}
                                                >
                                                    <FormControl className="sr-only">
                                                        <RadioGroupItem value={item.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal flex gap-2">
                                                        {field.value === item.value ? (
                                                            <CheckIcon className="!size-3" />
                                                        ) : (
                                                            <PlusIcon className="!size-3" />
                                                        )}
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="openSides"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[7].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[7].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                        {/* <FormField
                            control={form.control}
                            name="hasConstruction"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[8].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[8].data.map((item, index) => (
                                                <FormItem
                                                    key={index}
                                                    className={`flex items-center space-y-0 ${field.value === item.value
                                                        ? "bg-blue-100 border border-blue-400"
                                                        : "bg-white border"
                                                        } rounded-full px-4 py-2`}
                                                >
                                                    <FormControl className="sr-only">
                                                        <RadioGroupItem value={item.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal flex gap-2">
                                                        {field.value === item.value ? (
                                                            <CheckIcon className="!size-3" />
                                                        ) : (
                                                            <PlusIcon className="!size-3" />
                                                        )}
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="possessionBy"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[9].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[9].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                            name="ownership"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>
                                        {FilterData[10].label}
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[10].data.map(
                                                (item, index) => (
                                                    <FormItem
                                                        key={index}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                item.value
                                                                ? "bg-blue-100 border border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={
                                                                    item.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal flex gap-2">
                                                            {field.value ===
                                                                item.value ? (
                                                                <CheckIcon className="!size-3" />
                                                            ) : (
                                                                <PlusIcon className="!size-3" />
                                                            )}
                                                            {item.label}
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
                        {/* <FormField
                            control={form.control}
                            name="inclusivePrice"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[11].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[11].data.map((item, index) => (
                                                <FormItem
                                                    key={index}
                                                    className={`flex items-center space-y-0 ${field.value === item.value
                                                        ? "bg-blue-100 border border-blue-400"
                                                        : "bg-white border"
                                                        } rounded-full px-4 py-2`}
                                                >
                                                    <FormControl className="sr-only">
                                                        <RadioGroupItem value={item.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal flex gap-2">
                                                        {field.value === item.value ? (
                                                            <CheckIcon className="!size-3" />
                                                        ) : (
                                                            <PlusIcon className="!size-3" />
                                                        )}
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isTaxExcluded"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[12].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[12].data.map((item, index) => (
                                                <FormItem
                                                    key={index}
                                                    className={`flex items-center space-y-0 ${field.value === item.value
                                                        ? "bg-blue-100 border border-blue-400"
                                                        : "bg-white border"
                                                        } rounded-full px-4 py-2`}
                                                >
                                                    <FormControl className="sr-only">
                                                        <RadioGroupItem value={item.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal flex gap-2">
                                                        {field.value === item.value ? (
                                                            <CheckIcon className="!size-3" />
                                                        ) : (
                                                            <PlusIcon className="!size-3" />
                                                        )}
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPriceNegotiable"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>{FilterData[13].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[13].data.map((item, index) => (
                                                <FormItem
                                                    key={index}
                                                    className={`flex items-center space-y-0 ${field.value === item.value
                                                        ? "bg-blue-100 border border-blue-400"
                                                        : "bg-white border"
                                                        } rounded-full px-4 py-2`}
                                                >
                                                    <FormControl className="sr-only">
                                                        <RadioGroupItem value={item.value} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal flex gap-2">
                                                        {field.value === item.value ? (
                                                            <CheckIcon className="!size-3" />
                                                        ) : (
                                                            <PlusIcon className="!size-3" />
                                                        )}
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="amenities"
                            render={() => (
                                <FormItem className="py-4">
                                    <FormLabel>
                                        {FilterData[14].label}
                                    </FormLabel>
                                    <div className="flex flex-wrap">
                                        {FilterData[14].data.map((item) => (
                                            <FormField
                                                key={item.value}
                                                control={form.control}
                                                name="amenities"
                                                render={({ field }) => {
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
                                                                        ? "bg-blue-100 border-blue-400"
                                                                        : "bg-white border"
                                                                    } rounded-full px-4 py-2`}
                                                            >
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="overlooking"
                            render={() => (
                                <FormItem className="py-4">
                                    <FormLabel>
                                        {FilterData[15].label}
                                    </FormLabel>
                                    <div className="flex gap-2 flex-wrap">
                                        {FilterData[15].data.map((item) => (
                                            <FormField
                                                key={item.value}
                                                control={form.control}
                                                name="overlooking"
                                                render={({ field }) => {
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
                                                                        ? "bg-blue-100 border-blue-400"
                                                                        : "bg-white border"
                                                                    } rounded-full px-4 py-2`}
                                                            >
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="otherFeatures"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>
                                        {FilterData[16].label}
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className=""
                                        >
                                            {FilterData[16].data.map(
                                                ({ value, label }) => (
                                                    <FormItem
                                                        key={value}
                                                        className="space-x-2"
                                                    >
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={value}
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
                                <FormItem className="flex flex-col gap-2 py-4">
                                    <FormLabel>
                                        {FilterData[17].label}
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {FilterData[17].data.map(
                                                ({ value, label }) => (
                                                    <FormItem
                                                        key={value}
                                                        className={`flex items-center space-y-0 ${field.value ===
                                                                value
                                                                ? "bg-blue-100 border-blue-400"
                                                                : "bg-white border"
                                                            } rounded-full px-4 py-2`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={value}
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
                            render={() => (
                                <FormItem className="py-4">
                                    <FormLabel>
                                        {FilterData[18].label}
                                    </FormLabel>
                                    <div className="flex flex-wrap">
                                        {FilterData[18].data.map((item) => (
                                            <FormField
                                                key={item.value}
                                                control={form.control}
                                                name="locationAdvantages"
                                                render={({ field }) => {
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
                                                                        ? "bg-blue-100 border-blue-400"
                                                                        : "bg-white border"
                                                                    } rounded-full px-4 py-2`}
                                                            >
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="px-4 w-full py-2 bg-[#6f272b] text-white rounded-lg"
                        >
                            Apply Filter
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default SearchFilter;

const FilterData = [
    {
        label: "Select Property Type",
        data: [
            {
                label: "All",
                value: "All",
            },
            {
                label: "Residential",
                value: "Residential",
            },
            {
                label: "Commercial",
                value: "Commercial",
            },
            {
                label: "Villa/bungalow",
                value: "Villa/bungalow",
            },
        ],
    },
    {
        label: "Select Property Categories",
        data: [
            {
                label: "Flat/Apartment",
                value: "Flat/Apartment",
            },
            {
                label: "Plot/Land",
                value: "Plot/Land",
            },
            {
                label: "Independent House/villa",
                value: "Independent House/villa",
            },
            {
                label: "Farmhouse",
                value: "Farmhouse",
            },
            {
                label: "Other",
                value: "Other",
            },
        ],
    },
    {
        label: "Select City",
        data: [
            {
                label: "Mumbai",
                value: "Mumbai",
            },
            {
                label: "Navi Mumbai",
                value: "Navi Mumbai",
            },
            {
                label: "Third Mumbai",
                value: "Third Mumbai",
            },
        ],
    },
    {
        label: "Select Locality",
        data: [
            {
                label: "All",
                value: "All",
            },
            {
                label: "Thane",
                value: "Thane",
            },
            {
                label: "Panvel",
                value: "Panvel",
            },
            {
                label: "Uran",
                value: "Uran",
            },
            {
                label: "Third Mumbai",
                value: "Third Mumbai",
            },
            {
                label: "Chirle",
                value: "Chirle",
            },
            {
                label: "Ranjanpada",
                value: "Ranjanpada",
            },
            {
                label: "Vindhane",
                value: "Vindhane",
            },
            {
                label: "Karjat",
                value: "Karjat",
            },
        ],
    },
    {
        label: "Select Property Price",
        data: [
            {
                label: "Select Min Value",
                data: [
                    { label: "1 Lakh", value: "100000" },
                    { label: "2 Lakhs", value: "200000" },
                    { label: "3 Lakhs", value: "300000" },
                    { label: "4 Lakhs", value: "400000" },
                    { label: "5 Lakhs", value: "500000" },
                    { label: "6 Lakhs", value: "600000" },
                    { label: "7 Lakhs", value: "700000" },
                    { label: "8 Lakhs", value: "800000" },
                ],
            },
            {
                label: "Select Max Value",
                data: [
                    { label: "5 Lakhs", value: "500000" },
                    { label: "10 Lakhs", value: "1000000" },
                    { label: "20 Lakhs", value: "2000000" },
                    { label: "30 Lakhs", value: "3000000" },
                    { label: "40 Lakhs", value: "4000000" },
                    { label: "50 Lakhs", value: "5000000" },
                    { label: "60 Lakhs", value: "6000000" },
                    { label: "70 Lakhs", value: "7000000" },
                    { label: "80 Lakhs", value: "8000000" },
                ],
            },
        ],
    },
    {
        label: "Select Allowed Floors",
        data: [
            {
                label: "1",
                value: "1",
            },
            {
                label: "2",
                value: "2",
            },
            {
                label: "3",
                value: "3",
            },
            {
                label: "4",
                value: "4",
            },
        ],
    },
    {
        label: "Select Boundry Walls",
        data: [
            {
                label: "True",
                value: true,
            },
            {
                label: "false",
                value: false,
            },
        ],
    },
    {
        label: "Select Open Sides",
        data: [
            {
                label: "1",
                value: "1",
            },
            {
                label: "2",
                value: "2",
            },
            {
                label: "3",
                value: "3",
            },
            {
                label: "4",
                value: "4",
            },
        ],
    },
    {
        label: "Select Any construction done",
        data: [
            {
                label: "True",
                value: true,
            },
            {
                label: "false",
                value: false,
            },
        ],
    },
    {
        label: "Select Possession by",
        data: [
            {
                label: "Immediate",
                value: "Immediate",
            },
            {
                label: "Within 3 months",
                value: "Within 3 months",
            },
            {
                label: "within 6 months",
                value: "within 6 months",
            },
            {
                label: "By 2025",
                value: "By 2025",
            },
            {
                label: "By 2026",
                value: "By 2026",
            },
            {
                label: "By 2027",
                value: "By 2027",
            },
        ],
    },
    {
        label: "Select Ownership",
        data: [
            {
                label: "Freehold",
                value: "freehold",
            },
            {
                label: "Leasehold",
                value: "leasehold",
            },
            {
                label: "Co-operative society",
                value: "co-operative society",
            },
            {
                label: "Power of Attorney",
                value: "power of attorney",
            },
        ],
    },
    {
        label: "Select Inclusive Price",
        data: [
            {
                label: "True",
                value: true,
            },
            {
                label: "false",
                value: false,
            },
        ],
    },
    {
        label: "Select Tax Excluded",
        data: [
            {
                label: "True",
                value: true,
            },
            {
                label: "false",
                value: false,
            },
        ],
    },
    {
        label: "Select Price Negotiable",
        data: [
            {
                label: "True",
                value: true,
            },
            {
                label: "false",
                value: false,
            },
        ],
    },
    {
        label: "Select Amenities",
        data: [
            {
                label: "Maintenance Staff",
                value: "Maintenance Staff",
            },
            {
                label: "Water Storage",
                value: "Water Storage",
            },
            {
                label: "Rain Water Harvesting",
                value: "Rain Water Harvesting",
            },
            {
                label: "Vaastu Complaint",
                value: "Vaastu Complaint",
            },
        ],
    },
    {
        label: "Select Overlooking",
        data: [
            { value: "Pool", label: "Pool" },
            { value: "Park/Garden", label: "Park/Garden" },
            { value: "Club", label: "Club" },
            { value: "Main Road", label: "Main Road" },
            { value: "Others", label: "Others" },
        ],
    },
    {
        label: "Select Other Features",
        data: [
            { value: "In a gated society", label: "In a gated society" },
            { value: "Corner Property", label: "Corner Property" },
        ],
    },
    {
        label: "Select Property Facing",
        data: [
            { value: "North", label: "North" },
            { value: "South", label: "South" },
            { value: "East", label: "East" },
            { value: "West", label: "West" },
            { value: "North East", label: "North-East" },
            { value: "North West", label: "North-West" },
            { value: "South East", label: "South-East" },
            { value: "South West", label: "South-West" },
        ],
    },
    {
        label: "Select Location Advantages",
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
        label: "Select Plot Area",
        data: [
            {
                label: "Select Min Value",
                data: [
                    { label: "100 sqft", value: "100 sqft" },
                    { label: "400 sqft", value: "400 sqft" },
                    { label: "600 sqft", value: "600 sqft" },
                    { label: "800 sqft", value: "800 sqft" },
                    { label: "1000 sqft", value: "1000 sqft" },
                    { label: "1400 sqft", value: "1400 sqft" },
                    { label: "2000 sqft", value: "2000 sqft" },
                ],
            },
            {
                label: "Select Max Value",
                data: [
                    { label: "100 sqft", value: "100 sqft" },
                    { label: "400 sqft", value: "400 sqft" },
                    { label: "600 sqft", value: "600 sqft" },
                    { label: "800 sqft", value: "800 sqft" },
                    { label: "1000 sqft", value: "1000 sqft" },
                    { label: "1400 sqft", value: "1400 sqft" },
                    { label: "2000 sqft", value: "2000 sqft" },
                ],
            },
        ],
    },
];
