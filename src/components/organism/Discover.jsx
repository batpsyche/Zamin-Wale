import { DollarSignIcon } from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Discover = () => {
    const cards = Array.from({ length: 3 }, (_, i) => i + 1);
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto px-4 py-4 md:py-6 lg:py-8 xl:py-10">
                    <div className="flex w-full">
                        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
                            Discover how we can help
                        </h2>
                    </div>
                    <div className="flex w-full overflow-x-hidden">
                        <Tabs
                            defaultValue="buying"
                            className="space-y-6 md:space-y-8"
                        >
                            <TabsList className="grid grid-cols-3 gap-4 w-fit">
                                <TabsTrigger value="buying">Buying</TabsTrigger>
                                <TabsTrigger value="renting">
                                    Renting
                                </TabsTrigger>
                                <TabsTrigger value="selling">
                                    Selling
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="buying"
                                className="w-full overflow-hidden"
                            >
                                <div className="flex w-full overflow-x-auto pb-3 scrollbar">
                                    <div className="flex lg:grid lg:grid-cols-3 w-fit gap-4">
                                        {cards.map((card) => (
                                            <Card
                                                key={card}
                                                className="w-80 lg:w-full"
                                            >
                                                <CardHeader>
                                                    <CardTitle className="text-sm font-semibold">
                                                        <div className="flex w-full justify-between">
                                                            <span>
                                                                Find out how
                                                                much you can
                                                                afford
                                                            </span>
                                                            <span className="items-center justify-center p-1 bg-red-500 rounded-full text-white">
                                                                <DollarSignIcon className="size-4" />
                                                            </span>
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm">
                                                        We'll help you estimate
                                                        your budget range. Save
                                                        to your buyer profile to
                                                        help in your search.
                                                    </p>
                                                </CardContent>
                                                <CardFooter>
                                                    <Link
                                                        href={"/"}
                                                        className="font-semibold text-sm hover:underline"
                                                    >
                                                        Try our affordability
                                                        calculator
                                                    </Link>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="renting"
                                className="w-full overflow-hidden"
                            >
                                <div className="flex w-full overflow-x-auto pb-3 scrollbar">
                                    <div className="flex lg:grid lg:grid-cols-3 w-fit gap-4">
                                        {cards.map((card) => (
                                            <Card
                                                key={card}
                                                className="w-80 lg:w-full"
                                            >
                                                <CardHeader>
                                                    <CardTitle className="text-sm font-semibold">
                                                        <div className="flex w-full justify-between">
                                                            <span>
                                                                Find out how
                                                                much you can
                                                                afford
                                                            </span>
                                                            <span className="items-center justify-center p-1 bg-red-500 rounded-full text-white">
                                                                <DollarSignIcon className="size-4" />
                                                            </span>
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm">
                                                        We'll help you estimate
                                                        your budget range. Save
                                                        to your buyer profile to
                                                        help in your search.
                                                    </p>
                                                </CardContent>
                                                <CardFooter>
                                                    <Link
                                                        href={"/"}
                                                        className="font-semibold text-sm hover:underline"
                                                    >
                                                        Try our affordability
                                                        calculator
                                                    </Link>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="selling"
                                className="w-full overflow-hidden"
                            >
                                <div className="flex w-full overflow-x-auto pb-3 scrollbar">
                                    <div className="flex lg:grid lg:grid-cols-3 w-fit gap-4">
                                        {cards.map((card) => (
                                            <Card
                                                key={card}
                                                className="w-80 lg:w-full"
                                            >
                                                <CardHeader>
                                                    <CardTitle className="text-sm font-semibold">
                                                        <div className="flex w-full justify-between">
                                                            <span>
                                                                Find out how
                                                                much you can
                                                                afford
                                                            </span>
                                                            <span className="items-center justify-center p-1 bg-red-500 rounded-full text-white">
                                                                <DollarSignIcon className="size-4" />
                                                            </span>
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm">
                                                        We'll help you estimate
                                                        your budget range. Save
                                                        to your buyer profile to
                                                        help in your search.
                                                    </p>
                                                </CardContent>
                                                <CardFooter>
                                                    <Link
                                                        href={"/"}
                                                        className="font-semibold text-sm hover:underline"
                                                    >
                                                        Try our affordability
                                                        calculator
                                                    </Link>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Discover;
