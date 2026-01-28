"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useZaminwaleStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const BasicDetailsSchema = z.object({
    listingType: z.enum(["Sell", "Rent/Lease"], {
        required_error: "You need to select type.",
    }),
    propertyType: z.enum(["Residential", "Commercial", "Villa/bungalow"], {
        required_error: "You need to select Property Type.",
    }),
    propertyCategories: z.enum(
        [
            "Flat/Apartment",
            "Plot/Land",
            "Other",
            "Villa",
            "Bungalow",
            "Farmhouse",
        ],
        { required_error: "You need to select Property Type." }
    ),
});

const Step1Data = [
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
                    {
                        label: "Flat/Apartment",
                        value: "Flat/Apartment",
                    },
                    {
                        label: "Plot/Land",
                        value: "Plot/Land",
                    },
                    {
                        label: "Other",
                        value: "Other",
                    },
                ],
            },
            {
                label: "Commercial",
                value: "Commercial",
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
                        label: "Other",
                        value: "Other",
                    },
                ],
            },
            {
                label: "Villa/bungalow",
                value: "Villa/bungalow",
                data: [
                    {
                        label: "Villa",
                        value: "Villa",
                    },
                    {
                        label: "Bungalow",
                        value: "Bungalow",
                    },
                    {
                        label: "Farmhouse",
                        value: "Farmhouse",
                    },
                ],
            },
        ],
    },
];

const BasicDetails = ({ onSubmit, prev, currentStep, loading, formData }) => {
    const user = useZaminwaleStore((store) => store.user);
    const form = useForm({
        resolver: zodResolver(BasicDetailsSchema),
        defaultValues: formData,
    });

    const type = form.watch("propertyType");

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-1 gap-10 flex-col w-full">
                        <div className="flex w-full">
                            <span className="text-xl md:text-2xl font-semibold">
                                Welcome back, {user?.name}!{" "}
                                <br className="hidden md:flex" /> Fill out your
                                basic details
                            </span>
                        </div>
                        <FormField
                            control={form.control}
                            name="listingType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step1Data[0].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {Step1Data[0].data.map(
                                                ({ value, label }) => (
                                                    <FormItem
                                                        key={value}
                                                        className={`flex items-center space-y-0 ${
                                                            field.value ===
                                                            value
                                                                ? "bg-blue-100 border-[#6f272b]"
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
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step1Data[1].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {Step1Data[1].data.map(
                                                ({ value, label }) => (
                                                    <FormItem
                                                        key={value}
                                                        className={`flex items-center space-y-0 ${
                                                            field.value ===
                                                            value
                                                                ? "bg-blue-100 border-[#6f272b]"
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
                        {type && (
                            <>
                                {["Residential"].includes(type) && (
                                    <FormField
                                        control={form.control}
                                        name="propertyCategories"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormLabel>
                                                    Select type
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="flex w-full flex-wrap"
                                                    >
                                                        {Step1Data[1].data[0].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <FormItem
                                                                    key={value}
                                                                    className={`flex items-center space-y-0 ${
                                                                        field.value ===
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
                                {["Commercial"].includes(type) && (
                                    <FormField
                                        control={form.control}
                                        name="propertyCategories"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormLabel>
                                                    Select type
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="flex w-full flex-wrap"
                                                    >
                                                        {Step1Data[1].data[1].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <FormItem
                                                                    key={value}
                                                                    className={`flex items-center space-y-0 ${
                                                                        field.value ===
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
                                {["Villa/bungalow"].includes(type) && (
                                    <FormField
                                        control={form.control}
                                        name="propertyCategories"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col gap-2">
                                                <FormLabel>
                                                    Select type
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="flex w-full flex-wrap"
                                                    >
                                                        {Step1Data[1].data[2].data.map(
                                                            ({
                                                                value,
                                                                label,
                                                            }) => (
                                                                <FormItem
                                                                    key={value}
                                                                    className={`flex items-center space-y-0 ${
                                                                        field.value ===
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
                            </>
                        )}
                        <div className="flex w-full mt-4">
                            <Button
                                onClick={prev}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-4"
                                disabled={currentStep === 0}
                            >
                                <ArrowLeft />
                            </Button>
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-[#6f272b] text-white rounded-lg"
                                disabled={loading}
                            >
                                {loading ? "Loading" : "Continue"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default BasicDetails;
