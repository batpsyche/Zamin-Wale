import { deleteProperty } from "@/actions/property";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const DeletePropertyBtn = ({ propertyId }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const resp = await deleteProperty(propertyId);
            toast.success(resp.message);
            router.push("/dashboard");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="rounded-full h-[unset] w-full md:w-fit text-xs border-[#6f272b] text-[#6f272b]"
                    >
                        <Trash2 />{" "}
                        <span className="hidden lg:flex">Delete</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your uploaded property.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="rounded-full h-[unset] bg-[#6f272b] w-full md:w-fit text-xs text-white"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeletePropertyBtn;
