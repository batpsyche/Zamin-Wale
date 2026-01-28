import { logOut } from "@/actions/user";
import useAuth from "@/hooks/useAuth";
import { getFirstName } from "@/lib/utils";
import useZaminwaleStore from "@/store";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const LogoutBtn = () => {
    const user = useZaminwaleStore((store) => store.user);
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logOut()
            .then((result) => {
                toast.success("User Logout successfully");
                router.push("/");
            })
            .catch((err) => {
                toast.error("Failed to logout user");
            });
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="md:flex h-[unset] rounded-full"
                    >
                        <User className="!size-4" />{" "}
                        {isAuthenticated ? getFirstName(user?.name) : "Login"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {isAuthenticated ? (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href={"/"} className="cursor-pointer">
                                    User Activity
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={"/dashboard"}
                                    className="cursor-pointer"
                                >
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <span
                                    onClick={() => handleLogout()}
                                    className="w-full justify-between cursor-pointer"
                                >
                                    Logout <LogOut className="!size-3" />
                                </span>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={"/auth/login"}
                                    className="cursor-pointer"
                                >
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={"/auth/register"}
                                    className="cursor-pointer"
                                >
                                    Register
                                </Link>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default LogoutBtn;
