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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AmenitiesSchema = z.object({
    amenities: z.array(z.string()).optional(),
    overlooking: z
        .array(z.string().optional()),
    otherFeatures: z.enum(["In a gated society", "Corner Property"]).optional(),
    propertyFacing: z.enum(
        [
            "North",
            "South",
            "East",
            "West",
            "North-East",
            "North-West",
            "South-East",
            "South-West",
        ],
    ).optional(),
    locationAdvantages: z
        .array(z.string()).optional(),
});

const Step5Data = [
    {
        label: "Amenities ( Optional )",
        data: [
            { value: "Maintenance Staff", label: "Maintenance Staff" },
            { value: "Water Storage", label: "Water Storage" },
            { value: "Rain Water Harvesting", label: "Rain Water Harvesting" },
            { value: "Vaastu Complaint", label: "Vaastu Complaint" },
        ],
    },
    {
        label: "Overlooking ( Optional )",
        data: [
            { value: "Pool", label: "Pool" },
            { value: "Park/Garden", label: "Park/Garden" },
            { value: "Club", label: "Club" },
            { value: "Main Road", label: "Main Road" },
            { value: "Others", label: "Others" },
        ],
    },
    {
        label: "Other Features ( Optional )",
        data: [
            { value: "In a gated society", label: "In a gated society" },
            { value: "Corner Property", label: "Corner Property" },
        ],
    },
    {
        label: "Property Facing ( Optional )",
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
        label: "Location Advantages ( Optional )",
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
];

const AmenitiesSection = ({
    onSubmit,
    prev,
    currentStep,
    loading,
    formData,
}) => {
    const form = useForm({
        resolver: zodResolver(AmenitiesSchema),
        defaultValues: {
            amenities: [],
            overlooking: [],
            otherFeatures: undefined,
            propertyFacing: undefined,
            locationAdvantages: [],
            ...formData,
        },
    });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-1 gap-10 flex-col w-full">
                        <div className="flex flex-col w-full">
                            <span className="text-xl md:text-2xl font-semibold">
                                Add amenities / unique features
                            </span>
                        </div>
                        <FormField
                            control={form.control}
                            name="amenities"
                            render={() => (
                                <FormItem>
                                    <FormLabel>{Step5Data[0].label}</FormLabel>
                                    <div className="flex gap-2 flex-wrap">
                                        {Step5Data[0].data.map((item) => (
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
                                                                    ? "bg-blue-100 border-[#6f272b]"
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
                                <FormItem>
                                    <FormLabel>{Step5Data[1].label}</FormLabel>
                                    <div className="flex gap-2 flex-wrap">
                                        {Step5Data[1].data.map((item) => (
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
                                                                    ? "bg-blue-100 border-[#6f272b]"
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
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step5Data[2].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className=""
                                        >
                                            {Step5Data[2].data.map(
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
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step5Data[3].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {Step5Data[3].data.map(
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
                                <FormItem>
                                    <FormLabel>{Step5Data[4].label}</FormLabel>
                                    <div className="flex gap-2 flex-wrap">
                                        {Step5Data[4].data.map((item) => (
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
                                                                    ? "bg-blue-100 border-[#6f272b]"
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
                        <div className="flex w-full mt-4 pb-6">
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

export default AmenitiesSection;
