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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PropertyDetailsSchema = z.object({
    plotArea: z.string({
        required_error: "Please enter area.",
    }),
    plotAreaUnit: z.string({
        required_error: "Please select area unit.",
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
});

const Step3Data = [
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
        label: "Property Dimesions ( Optional )",
    },
    {
        label: "Floors allowed for construction",
    },
    {
        label: "Is there boundry walls around the property ? ( Optional )",
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
        label: "Any construction done on this property ? ( Optional )",
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
];

const PropertyProfile = ({
    onSubmit,
    prev,
    currentStep,
    loading,
    formData,
}) => {
    const form = useForm({
        resolver: zodResolver(PropertyDetailsSchema),
        defaultValues: formData ?? {},
    });

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-fit w-full"
                >
                    <div className="flex h-fit gap-10 flex-col w-full">
                        <div className="flex flex-col w-full">
                            <span className="text-xl md:text-2xl font-semibold">
                                Tell us about your property
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="plotArea"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>
                                            {Step3Data[0].label}
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
                                        <FormLabel>Area Unit</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value ?? ""}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Area Unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Step3Data[0].data.map(
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
                        </div>
                        <div className="flex w-full gap-4 flex-col">
                            <FormLabel>{Step3Data[1].label}</FormLabel>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="length"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            {/* <FormLabel>{Step3Data[s1].label}</FormLabel> */}
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Plot Length "
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
                                    name="breadth"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            {/* <FormLabel>{Step3Data[1].label}</FormLabel> */}
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Plot Breadth"
                                                    {...field}
                                                    value={field.value ?? ""}
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
                                    <FormLabel>{Step3Data[2].label}</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="hasBoundaryWall"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step3Data[3].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {Step3Data[3].data.map(
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
                            name="openSides"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step3Data[4].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {Step3Data[4].data.map(
                                                (data, i) => (
                                                    <FormItem
                                                        key={i}
                                                        className={`flex items-center space-y-0 ${
                                                            field.value ===
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
                                                            {data?.label}
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
                            name="hasConstruction"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step3Data[5].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {Step3Data[5].data.map(
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
                            name="possessionBy"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step3Data[6].label}</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value ?? ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Expected by" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Step3Data[6].data.map(
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
                            name="ownership"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>{Step3Data[7].label}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-wrap"
                                        >
                                            {Step3Data[7].data.map(
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
                        <div className="flex w-full gap-4 flex-col">
                            <FormLabel>{Step3Data[8].label}</FormLabel>
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
                                                    value={field.value ?? ""}
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
                                                    value={field.value ?? ""}
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
                                                onCheckedChange={field.onChange}
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
                                                onCheckedChange={field.onChange}
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
                                                onCheckedChange={field.onChange}
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
                                    <FormLabel>{Step3Data[9].label}</FormLabel>
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
                        <div className="flex gap-4 pb-6 w-full">
                            <Button
                                onClick={prev}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
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

export default PropertyProfile;
