"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const SearchData = [
    {
        label: "Property Type",
        data: [
            {
                label: "Buy",
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
        label: "Locality",
        data: [
            {
                label: "Thane",
                value: "thane",
            },
            {
                label: "Khopoli Pali Road",
                value: "khopoli-pali-road",
            },
            {
                label: "Panvel",
                value: "panvel",
            },
            {
                label: "Uran",
                value: "uran",
            },
            {
                label: "Chirle",
                value: "chirle",
            },
            {
                label: "Ranjanpada",
                value: "ranjanpada",
            },
            {
                label: "Vindhane",
                value: "vindhane",
            },
            {
                label: "Karjat",
                value: "karjat",
            },
            {
                label: "Pen",
                value: "pen",
            },
            {
                label: "Alibaug",
                value: "alibaug",
            },
        ],
    },
];

const FormSchema = z.object({
    location: z.string({
        required_error: "Please select a Location.",
    }),
    propertyType: z
        .string({
            required_error: "Please select a Location.",
        })
        .optional(),
});

const SearchBar = () => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    const getPropertyType = form.watch("propertyType");

    const onSubmit = (values) => {
        router.push(
            `/search/top-location/${values.location}?propertyType=${
                values.propertyType ?? "All"
            }`
        );
    };

    return (
        <>
            <Form {...form} className="w-full">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex w-full flex-col items-center justify-center"
                >
                    <div className="flex w-full text-sm md:text-base">
                        <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col gap-2">
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex h-10 w-full grid-cols-4 items-center justify-center gap-1 md:grid md:h-14"
                                        >
                                            {SearchData[0].data.map(
                                                ({ value, label }) => (
                                                    <FormItem
                                                        key={value}
                                                        className={`flex items-center justify-center space-y-0 border-b-2 transition-all delay-500 ${
                                                            field.value ===
                                                            value
                                                                ? "border-[#6f272b] text-[#6f272b]"
                                                                : "border-white"
                                                        } py-1 px-1 md:px-4 md:py-2 md:h-full`}
                                                    >
                                                        <FormControl className="sr-only">
                                                            <RadioGroupItem
                                                                value={value}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal md:text-lg md:font-medium">
                                                            {label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex h-12 w-full items-center rounded-3xl border bg-white px-1 md:h-14 md:rounded-2xl md:border-neutral-200 md:bg-none md:px-3">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                icon={false}
                                                className="border-none outline-none ring-white focus:border-none focus:ring-white"
                                            >
                                                <SelectValue
                                                    placeholder={`${
                                                        getPropertyType ===
                                                        "Buy"
                                                            ? "Select Your Location"
                                                            : getPropertyType ===
                                                              "Residential"
                                                            ? "Residential Plots"
                                                            : getPropertyType ===
                                                              "Commercial"
                                                            ? "Commercial Plots"
                                                            : getPropertyType ===
                                                              "Villa/bungalow"
                                                            ? "Villa/bungalow Plots"
                                                            : "Select Your Location"
                                                    }`}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {SearchData[1].data.map(
                                                (location, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={location.value}
                                                    >
                                                        {location.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="rounded-full bg-[#6f272b]"
                        >
                            <Search />
                            Search
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};
export default SearchBar;
