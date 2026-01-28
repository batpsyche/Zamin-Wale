import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LocationDetailsSchema = z.object({
    city: z.string({
        required_error: "Please select city.",
    }),
    locality: z.string({
        required_error: "Please select locality.",
    }),
});

const Step2Data = [
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
            { value: "Alibaug", label: "Alibaug" },
            { value: "khopoli Pali Road", label: "khopoli Pali Road" },
            { label: "Panvel", value: "Panvel" },
            { label: "Uran", value: "Uran" },
            { label: "Chirle", value: "Chirle" },
            { label: "Ranjanpada", value: "Ranjanpada" },
            { label: "Vindhane", value: "Vindhane" },
            { label: "Karjat", value: "Karjat" },
        ],
    },
];

const LocationDetails = ({
    onSubmit,
    prev,
    currentStep,
    loading,
    formData,
}) => {
    const form = useForm({
        resolver: zodResolver(LocationDetailsSchema),
        defaultValues: formData,
    });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-1 gap-10 flex-col w-full">
                        <div className="flex gap-1 flex-col w-full">
                            <span className="text-xl md:text-2xl font-semibold">
                                Where is your property located
                            </span>
                            <span className="text-sm md:text-base">
                                An accurate location helps you to connect with
                                buyers
                            </span>
                        </div>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step2Data[0].label}</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select City" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Step2Data[0].data.map(
                                                    ({ value, label }) => (
                                                        <SelectItem
                                                            key={label}
                                                            value={value}
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
                                    <FormLabel>{Step2Data[1].label}</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Locality" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Step2Data[1].data.map(
                                                    ({ value, label }) => (
                                                        <SelectItem
                                                            key={label}
                                                            value={value}
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

export default LocationDetails;
