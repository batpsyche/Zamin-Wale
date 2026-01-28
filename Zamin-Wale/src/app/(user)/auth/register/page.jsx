"use client";

import { signUp } from "@/actions/user";
import Loading from "@/components/atoms/Loading";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Fullname must be at least 2 characters.",
        })
        .regex(/^[A-Za-z\s]+$/, "Only alphabets are allowed."),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    mobileNo: z
        .string()
        .min(10, {
            message: "Mobile No must be at least 10 Digit.",
        })
        .max(10, {
            message: "Mobile No must be at Max 10 Digit.",
        }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

const Page = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useZaminwaleStore((store) => store.dispatch);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            mobileNo: "",
            password: "",
        },
    });

    const onSubmit = async (values) => {
        setLoading(true);
        await signUp(values)
            .then((resp) => {
                setLoading(false);
                form.reset();
                toast.success(resp.message);
                router.push("/auth/login");

                dispatch({
                    type: "SET_STATE",
                    payload: { isAuthenticated: true },
                });

                cookieService.setTokens({
                    accessToken: resp.token,
                });
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    return (
        <>
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex w-full flex-col gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Your Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter Your Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mobileNo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mobile</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="Enter Your Mobile"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter Your Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full bg-[#6f272b]"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <Loading /> : "Register"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-between">
                    <span className="text-neutral-800 text-sm">
                        If you allready have Account
                    </span>
                    <Button
                        asChild
                        variant="link"
                        className="hover:text-[#6f272b]"
                    >
                        <Link href={"/auth/login"}>Log In</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default Page;
