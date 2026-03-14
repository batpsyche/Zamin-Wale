"use client";

import { logIn } from "@/actions/user";
import cookieService from "@/services/cookie";
import useZaminwaleStore from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

const page = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useZaminwaleStore((store) => store.dispatch);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const resp = await logIn({ email: values.email, password: values.password });
            cookieService.setTokens({ accessToken: resp.token });
            dispatch({
                type: "SET_STATE",
                payload: {
                    user: {
                        id: resp.id,
                        name: resp.name,
                        email: resp.email,
                        mobileNo: resp.mobileNo,
                    },
                    isAuthenticated: true,
                },
            });
            form.reset();
            toast.success(resp.message ?? "Login successful");
            router.push("/admin/dashboard");
        } catch (err) {
            toast.error(err?.message ?? "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-full max-w-7xl mx-auto p-4 items-center justify-center">
            <Card className="w-full max-w-sm shadow-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex w-full flex-col gap-4"
                        >
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
                                {loading ? "Logging in…" : "Log In"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;
